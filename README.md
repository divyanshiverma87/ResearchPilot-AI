# ResearchPilot AI 🚀

> **An AI-powered research assistant for structured learning, exploration, and interview preparation.**

ResearchPilot AI helps users research any topic by generating a structured, easy-to-read report using the **Google Gemini API**.

Instead of providing only a simple AI response, the application organizes research into meaningful sections such as **key concepts, real-world applications, latest trends, interview questions, learning resources, revision notes, quizzes, and suggested next topics**.

---

## ✨ Features

- 🔍 **AI-Powered Research** — Generate research reports on any topic
- ⚡ **Three Research Depths**
  - Quick Summary
  - In-Depth Analysis
  - Comprehensive Guide
- 📚 **Structured Reports** — Organized into clearly defined sections
- 💡 **Key Concepts** — Understand the fundamentals of a topic
- 🌍 **Real-World Applications** — Explore practical use cases
- 📈 **Latest Trends** — Discover current developments related to the topic
- 💼 **Interview Questions** — Prepare for technical interviews
- 📖 **Learning Resources** — Get relevant resources for further study
- 📝 **Quick Revision Notes** — Review important points quickly
- 🧠 **Interactive Quiz** — Test your understanding
- 🔗 **Suggested Next Topics** — Continue learning logically
- 📋 **Copy Report** — Copy the generated report instantly
- 📥 **Download as Markdown** — Save reports for later use
- 🌙 **Modern Dark UI** — Responsive and user-friendly interface

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Backend** | Python, Flask |
| **AI** | Google Gemini API |
| **Configuration** | python-dotenv |
| **Output** | Markdown |

---

## 📸 Screenshots

### 🏠 Home Page

The main interface where users enter a research topic and choose the desired research depth.

![ResearchPilot AI Home](home.png)

### ⚙️ Research Generation

Shows the research generation process with visual feedback while the AI creates the report.

![Research Generation](research.png)

### 📄 Generated Research Report

Displays the generated report with sections such as **Overview** and **Key Concepts**, demonstrating how the application transforms a topic into structured learning content.

![Generated Research Report](result.png)

### 📚 Additional Report Sections

Shows **Learning Resources, Quick Revision Notes, Quiz, and Suggested Next Topics**, extending the report beyond basic explanations.

![Additional Report Sections](result2.png)

---

## 🔄 How It Works

```text
                User
                 │
                 ▼
          Enter Research Topic
                 │
                 ▼
        Select Research Depth
                 │
                 ▼
          Flask Backend
                 │
                 ▼
         Google Gemini API
                 │
                 ▼
      Structured Research Report
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
      Read     Copy    Download
