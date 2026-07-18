from flask import Flask, render_template, request, jsonify
from config import Config
from services.gemini_service import GeminiService

# Initialize the Flask Application
app = Flask(__name__)

# Load configuration settings from config.py
app.config.from_object(Config)

# Initialize the Gemini service (it will check the config's API key automatically)
gemini_service = GeminiService(api_key=app.config.get('GEMINI_API_KEY'))


@app.route('/')
def index():
    """
    Renders the main dashboard for the application.
    """
    # Check if the API key is configured and pass a flag to the frontend.
    # This helps guide beginners to set up their .env file.
    api_key_configured = bool(app.config.get('GEMINI_API_KEY'))
    return render_template('index.html', api_key_configured=api_key_configured)


@app.route('/api/research', methods=['POST'])
def research():
    """
    API endpoint that accepts research requests and returns the generated report.
    Expected JSON payload:
    {
        "topic": "Search topic",
        "depth": "quick" | "detailed" | "comprehensive"
    }
    """
    data = request.get_json() or {}
    topic = data.get('topic', '').strip()
    depth = data.get('depth', 'quick').strip()

    # 1. Validation: Check for empty input
    if not topic:
        return jsonify({
            'success': False,
            'error': 'The research topic cannot be empty. Please enter a valid subject.'
        }), 400

    # Validate the depth option
    if depth not in ['quick', 'detailed', 'comprehensive']:
        return jsonify({
            'success': False,
            'error': "Invalid depth selected. Please choose 'Quick Summary', 'In-Depth Analysis', or 'Comprehensive Guide'."
        }), 400

    # 2. Check API Key configuration
    if not app.config.get('GEMINI_API_KEY'):
        return jsonify({
            'success': False,
            'error': (
                'Gemini API key is not configured on the server. '
                'Please copy .env.example to .env, add your API key, and restart the Flask server.'
            )
        }), 500

    # 3. Call the Gemini service wrapper to generate the report
    try:
        # We re-instantiate or run with current key to ensure dynamic updates if config changes
        service = GeminiService(api_key=app.config.get('GEMINI_API_KEY'))
        report_markdown = service.generate_research_report(topic, depth)
        
        return jsonify({
            'success': True,
            'report': report_markdown,
            'topic': topic,
            'depth': depth
        })

    except ValueError as val_err:
        # Handled error (e.g. client validation failure)
        return jsonify({
            'success': False,
            'error': str(val_err)
        }), 400

    except RuntimeError as run_err:
        # System errors (Gemini API invalid key, rate limit, quota, network timeout)
        return jsonify({
            'success': False,
            'error': str(run_err)
        }), 500

    except Exception as e:
        # Catch-all for any other unanticipated exception
        return jsonify({
            'success': False,
            'error': f"An unexpected system error occurred: {str(e)}"
        }), 500


if __name__ == '__main__':
    # Run the application locally on http://127.0.0.1:5000/
    # Debug mode is loaded from Config (default: True in development)
    app.run(host='127.0.0.1', port=5000, debug=app.config['DEBUG'])
