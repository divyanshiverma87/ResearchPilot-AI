# ResearchPilot AI 🚀

ResearchPilot AI is a beginner-friendly, professional, AI-powered research assistant application. It helps users jumpstart their learning on any topic by generating structured, comprehensive, and clean research reports in Markdown format, powered by the Google Gemini API.

Whether you're studying for an exam, preparing for a technical interview, or researching a new industry trend, ResearchPilot AI serves as your dedicated Co-Pilot.

---

## ✨ Features

- **Custom Research Depths**: Choose from:
  - **Quick Summary**: Rapid high-level synthesis of a topic.
  - **In-Depth Analysis**: Detailed exploration of concepts, architectures, and facts.
  - **Comprehensive Guide**: A full study companion containing all details, explanations, and resources.
- **Strict Nine-Section Report Structure**: Every generated report is formatted with high readability and contains:
  - **Overview**: Context, definition, and introduction.
  - **Key Concepts**: Core building blocks and technical explanations.
  - **Real World Applications**: Case studies and practical scenarios.
  - **Latest Trends**: Modern changes, advancements, and state-of-the-art status.
  - **Interview Questions**: Sample questions with detailed guidance on answers.
  - **Learning Resources**: Curated books, courses, documentations, or links.
  - **Quick Revision Notes**: Short summary bullet-points.
  - **Quiz**: Self-assessment questions with answers.
  - **Suggested Next Topics**: Interconnected topics for logical learning progression.
- **Copy and Export Options**:
  - **Copy Report**: Instantly copy the raw Markdown formatted report to your clipboard.
  - **Download Markdown**: Download the research paper as a `.md` file for local reading or importing into Obsidian, Notion, or GitHub.
- **Premium User Interface**: Modern dark-themed dashboard featuring responsive flex layouts, glowing glassmorphism, responsive sidebar widgets, and loading micro-animations.

---

## 🛠️ Tech Stack

- **Backend**: Python 3.8+, Flask
- **AI Model**: Google Gemini API (`gemini-2.5-flash`)
- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Custom Variables, Modern Typography, Responsive Flexbox/Grid), Vanilla JavaScript (ES6+, DOM Manipulation, Async/Await)

---

## 📂 Project Structure

```
ResearchPilot-AI/
│
├── services/
│   ├── __init__.py
│   └── gemini_service.py     # Gemini AI API interface & system instructions
│
├── static/
│   ├── css/
│   │   └── style.css         # Modern, high-fidelity UI styles
│   ├── js/
│   │   └── main.js           # Client-side logic, Markdown compiler, file download handlers
│   └── favicon.ico           # Web page favicon
│
├── templates/
│   └── index.html            # Main Single Page App (SPA) template
│
├── .env.example              # Template for environment settings
├── .gitignore                # Files excluded from git tracking
├── app.py                    # Flask server initialization & routes
├── config.py                 # Application configuration values loader
├── README.md                 # Project documentation (this file)
└── requirements.txt          # Python dependency list
```

---

## 🚀 Installation & Setup

Follow these steps to run the application locally on your machine:

### 1. Clone or Download the Repository
Extract or clone this repository to your local workspace directory.

### 2. Set Up a Virtual Environment (Recommended)
Create and activate a Python virtual environment to manage dependencies:

**On Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
```

**On macOS / Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
Install all package requirements using `pip`:
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
1. Copy the template environment file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` in a text editor and provide your **Gemini API Key**:
   ```env
   GEMINI_API_KEY=AIzaSy...your_gemini_api_key...
   ```
   > [!NOTE]
   > You can get a free Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### 5. Launch the Server
Start the Flask application:
```bash
python app.py
```

Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 📸 Screenshots

*A screenshot of the dashboard interface will be added here once deployment is finalized.*

---

## 🔮 Future Enhancements

- **User Accounts & History**: Saving and organizing past research reports.
- **Export to PDF / HTML**: Local compilation to styled PDF documents.
- **Context PDF Uploads**: Allowing users to upload their own PDFs for the research pilot to summarize.
- **Multi-Agent Search**: Integrating live web search API tools to retrieve real-time facts before synthesisation.
