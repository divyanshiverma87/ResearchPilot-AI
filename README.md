# ResearchPilot AI 🚀

ResearchPilot AI is an AI-powered research assistant built with **Python, Flask, and Google Gemini API**.

It helps users explore any topic by generating a structured research report with key concepts, real-world applications, interview questions, learning resources, quick revision notes, quizzes, and suggested next topics.

The project is designed to make learning and research more organized and easier to explore.

> **Project Status:** Currently available for local use. Deployment is planned for a future version.

---

## ✨ Features

- 🔍 AI-powered research on any topic
- ⚡ Multiple research depths:
  - Quick Summary
  - In-Depth Analysis
  - Comprehensive Guide
- 📚 Structured research reports
- 💡 Key concepts and real-world applications
- 💼 Topic-specific interview questions
- 📖 Learning resources
- 📝 Quick revision notes
- 🧠 Interactive quiz
- 🔗 Suggested next topics
- 📋 Copy generated report
- 📥 Download report in Markdown format
- 🌙 Responsive dark-themed user interface

---

## 🛠️ Tech Stack

### Backend
- Python
- Flask

### AI
- Google Gemini API
- Gemini 2.5 Flash

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)

### Libraries
- python-dotenv
- Google Generative AI

---

## 📸 Screenshots

### Home Page
The main ResearchPilot AI interface where users enter a research topic and select the desired research depth.
It provides a clean dashboard for starting a new research session.

![ResearchPilot AI Home](home.png)

### Research Configuration
Shows the AI research generation process after a topic and research depth are selected.
The interface provides visual feedback while Gemini generates the research content.

![Research Configuration](research.png)

### Generated Research Report
Displays the generated research report with key sections such as Overview and Key Concepts.  
It demonstrates how ResearchPilot AI transforms a topic into structured, easy-to-read learning content.


![Research Result](result.png)

### Research Report – Additional View
Shows Learning Resources, Quick Revision Notes, Quiz, and Suggested Next Topics for deeper learning and self-assessment.


![Research Result](result2.png)

---

## 🔄 How It Works

```text
User enters a topic
        ↓
Selects research depth
        ↓
Flask Backend
        ↓
Google Gemini API
        ↓
AI-generated research report
        ↓
User can read, copy or download the report
