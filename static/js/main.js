/**
 * ==========================================================================
 * RESEARCHPILOT AI - FRONTEND JAVASCRIPT CONTROLLER
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core DOM Element Selectors
    const researchForm = document.getElementById('research-form');
    const topicInput = document.getElementById('topic');
    const clearInputBtn = document.getElementById('clear-input-btn');
    const depthCards = document.querySelectorAll('.depth-card');
    
    // States views
    const welcomeState = document.getElementById('welcome-state');
    const loadingState = document.getElementById('loading-state');
    const reportResults = document.getElementById('report-results');
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');
    const closeErrorBtn = document.getElementById('close-error-btn');
    
    // Typing animation & progress elements
    const typingTextEl = document.getElementById('typing-text');
    const generateBtn = document.getElementById('generate-btn');
    
    // Meta descriptors
    const resultTopicTitle = document.getElementById('result-topic-title');
    const resultDepthBadge = document.getElementById('result-depth-badge');
    const resultWordBadge = document.getElementById('result-word-badge');
    const actionToolbar = document.getElementById('action-toolbar');
    
    // Action Buttons
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const clearBtn = document.getElementById('clear-btn');
    const suggestionPills = document.querySelectorAll('.suggestion-pill');
    
    // Modal elements
    const expandedModal = document.getElementById('expanded-modal');
    const modalTitleText = document.getElementById('modal-title-text');
    const modalBodyContent = document.getElementById('modal-body-content');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const expandCardBtns = document.querySelectorAll('.expand-card-btn');
    
    // Toast Notification
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // 2. Global State Variable for current report markdown
    let currentReportRawMarkdown = '';
    let currentResearchTopic = '';
    let typingIntervalId = null;
    let statusTimerId = null;

    // Focus input on load
    topicInput.focus();

    // 3. Setup Suggestions Pill Listeners
    suggestionPills.forEach(pill => {
        pill.addEventListener('click', () => {
            topicInput.value = pill.textContent;
            triggerInputStateChange();
            // Pulse the input field visually to draw attention
            topicInput.focus();
        });
    });

    // 4. Topic Input Clear Actions
    topicInput.addEventListener('input', triggerInputStateChange);
    clearInputBtn.addEventListener('click', () => {
        topicInput.value = '';
        triggerInputStateChange();
        topicInput.focus();
    });

    function triggerInputStateChange() {
        if (topicInput.value.length > 0) {
            clearInputBtn.style.display = 'block';
        } else {
            clearInputBtn.style.display = 'none';
        }
    }

    // 5. Custom Depth Radio Selector Cards
    depthCards.forEach(card => {
        card.addEventListener('click', function() {
            depthCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 6. Typing Animation Logic
    // We rotate through simulated thinking statuses to keep the user engaged
    const typingPhrases = [
        "Initializing research modules...",
        "Scanning academic hierarchies...",
        "Querying Gemini models...",
        "Structuring Overview layouts...",
        "Synthesizing Key Concepts...",
        "Discovering Real World Applications...",
        "Analyzing Latest Trends...",
        "Drafting Interview Questions...",
        "Compiling Learning Resources...",
        "Generating Quick Revision Notes...",
        "Designing Quiz questions...",
        "Evaluating suggested progression topics...",
        "Polishing Markdown layout syntax...",
        "Almost done. Preparing dashboard presentation..."
    ];

    function startTypingAnimation() {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentPhrase = '';
        
        typingTextEl.textContent = '';
        
        function tick() {
            const fullPhrase = typingPhrases[phraseIndex];
            
            if (isDeleting) {
                currentPhrase = fullPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentPhrase = fullPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typingTextEl.textContent = currentPhrase;
            
            let typingSpeed = 60;
            if (isDeleting) { typingSpeed /= 2; }
            
            if (!isDeleting && charIndex === fullPhrase.length) {
                // Pause at complete string
                typingSpeed = 2500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % typingPhrases.length;
                typingSpeed = 200;
            }
            
            typingIntervalId = setTimeout(tick, typingSpeed);
        }
        
        tick();
    }

    function stopTypingAnimation() {
        if (typingIntervalId) {
            clearTimeout(typingIntervalId);
            typingIntervalId = null;
        }
        typingTextEl.textContent = '';
    }

    // Rotator for progress statuses
    const loadingMessages = [
        "🧠 Understanding your topic...",
        "📚 Gathering key concepts...",
        "🌍 Exploring real-world applications...",
        "📝 Generating structured report...",
        "✨ Finalizing research..."
    ];

    function startProgressRotator() {
        let stage = 0;
        const statusEl = document.querySelector('.loading-status');
        if (!statusEl) return;
        
        statusEl.textContent = loadingMessages[stage];
        
        statusTimerId = setInterval(() => {
            stage++;
            if (stage < loadingMessages.length) {
                statusEl.style.transition = 'opacity 0.2s ease';
                statusEl.style.opacity = '0';
                setTimeout(() => {
                    statusEl.textContent = loadingMessages[stage];
                    statusEl.style.opacity = '1';
                }, 200);
            } else {
                clearInterval(statusTimerId);
            }
        }, 3500);
    }

    function stopProgressRotator() {
        if (statusTimerId) {
            clearInterval(statusTimerId);
            statusTimerId = null;
        }
        const statusEl = document.querySelector('.loading-status');
        if (statusEl) {
            statusEl.textContent = "Plotting Course and Synthesizing Knowledge...";
        }
    }

    // 7. Markdown to HTML Compiler (Self-contained regex-based engine)
    function compileMarkdownToHtml(markdownText) {
        if (!markdownText || !markdownText.trim()) {
            return '<p class="empty-section">No data generated for this section.</p>';
        }
        
        let html = markdownText;
        
        // Escape HTML tags to protect against XSS
        html = html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Code blocks: ```language ... ```
        html = html.replace(/```(?:[a-zA-Z0-9]+)?\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>');
        
        // Inline code: `code`
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Bold: **text**
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Italic: *text* or _text_
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

        // Headers: ### text, #### text, etc.
        html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

        // Lists (unordered): * item or - item
        html = html.replace(/^\s*[\*\-]\s+(.*?)$/gm, '<li>$1</li>');
        // Wrap adjacent <li> tags in <ul> tags
        html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
        html = html.replace(/<\/ul>\s*<ul>/g, ''); // Flatten gaps

        // Handle simple linebreaks and paragraphs
        const lines = html.split(/\n\n+/);
        html = lines.map(line => {
            line = line.trim();
            if (!line) return '';
            
            // Check if it already starts with block tags
            const blockTags = ['<pre>', '<ul>', '<ol>', '<h1', '<h2', '<h3', '<h4', '<li>', '<table>', '<tr>', '<th>', '<td>'];
            const startsWithBlock = blockTags.some(tag => line.startsWith(tag));
            
            if (startsWithBlock) {
                return line;
            }
            return `<p>${line.replace(/\n/g, '<br>')}</p>`;
        }).join('\n');

        return html;
    }

    // 8. Robust Report Splitter (9 segments parser)
    function parseReportSections(markdownText) {
        const sectionsData = {};
        const lowerMarkdown = markdownText.toLowerCase();
        
        // Define exact mapping sections and possible variations in Gemini output
        const sectionDefinitions = [
            { id: 'overview', matches: ['## overview'] },
            { id: 'keyConcepts', matches: ['## key concepts'] },
            { id: 'realWorldApplications', matches: ['## real world applications', '## real-world applications'] },
            { id: 'latestTrends', matches: ['## latest trends'] },
            { id: 'interviewQuestions', matches: ['## interview questions'] },
            { id: 'learningResources', matches: ['## learning resources'] },
            { id: 'quickRevisionNotes', matches: ['## quick revision notes'] },
            { id: 'quiz', matches: ['## quiz'] },
            { id: 'suggestedNextTopics', matches: ['## suggested next topics'] }
        ];

        // Locate start positions
        const matchedPositions = [];
        sectionDefinitions.forEach(sec => {
            let foundIndex = -1;
            let matchedStr = '';
            
            for (const pattern of sec.matches) {
                foundIndex = lowerMarkdown.indexOf(pattern);
                if (foundIndex !== -1) {
                    matchedStr = pattern;
                    break;
                }
            }
            
            if (foundIndex !== -1) {
                matchedPositions.push({
                    id: sec.id,
                    index: foundIndex,
                    headerLength: matchedStr.length
                });
            }
        });

        // Sort match indexes ascending
        matchedPositions.sort((a, b) => a.index - b.index);

        // Segment content slicing
        for (let idx = 0; idx < matchedPositions.length; idx++) {
            const current = matchedPositions[idx];
            const startContent = current.index + current.headerLength;
            
            // End content is the beginning index of the next section, or the end of the text
            const endContent = (idx + 1 < matchedPositions.length) ? matchedPositions[idx + 1].index : markdownText.length;
            
            sectionsData[current.id] = markdownText.substring(startContent, endContent).trim();
        }

        // Fill missing cards if API output missed some heading
        sectionDefinitions.forEach(sec => {
            if (!sectionsData[sec.id]) {
                sectionsData[sec.id] = "*This section was not generated by the AI model. Try running research again.*";
            }
        });

        return sectionsData;
    }

    // 9. Toast Notification Popup Helper
    function showToast(message, type = 'success') {
        toastMessage.textContent = message;
        
        const iconEl = toast.querySelector('.toast-icon');
        if (type === 'error') {
            iconEl.className = 'fa-solid fa-circle-xmark toast-icon';
            iconEl.style.color = '#ef4444';
        } else {
            iconEl.className = 'fa-solid fa-circle-check toast-icon';
            iconEl.style.color = '#10b981';
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 10. API Submission Controller
    researchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const topicVal = topicInput.value.trim();
        const depthVal = document.querySelector('input[name="depth"]:checked').value;
        
        if (!topicVal) return;

        // Reset UI Views
        errorAlert.style.display = 'none';
        welcomeState.style.display = 'none';
        reportResults.style.display = 'none';
        actionToolbar.style.display = 'none';
        
        // Show Loading Screen
        loadingState.style.display = 'flex';
        startTypingAnimation();
        startProgressRotator();
        
        // Disable submission button
        generateBtn.disabled = true;
        generateBtn.querySelector('.btn-text').textContent = "Synthesizing...";

        try {
            const response = await fetch('/api/research', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    topic: topicVal,
                    depth: depthVal
                })
            });
            
            const data = await response.getJson ? await response.getJson() : await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Server connection failed. Could not pull research report.');
            }

            // Report generation successful
            currentReportRawMarkdown = data.report;
            currentResearchTopic = data.topic;

            // Save to recent searches
            saveRecentSearch(data.topic);

            // Render Output fields
            renderReportResults(data.topic, data.depth, data.report);

        } catch (error) {
            console.error('Research API Error:', error);
            // Display error alert
            errorMessage.textContent = error.message;
            errorAlert.style.display = 'flex';
            welcomeState.style.display = 'flex';
            showToast(error.message || "An error occurred.", "error");
        } finally {
            // Restore buttons
            stopTypingAnimation();
            stopProgressRotator();
            loadingState.style.display = 'none';
            generateBtn.disabled = false;
            generateBtn.querySelector('.btn-text').textContent = "Launch Research";
        }
    });

    // 11. Render Report Cards Logic
    function renderReportResults(topic, depth, markdown) {
        // Set metadata titles
        resultTopicTitle.textContent = topic;
        resultDepthBadge.textContent = depth === 'quick' ? 'Quick Summary' : (depth === 'detailed' ? 'In-Depth Analysis' : 'Comprehensive Guide');
        
        // Calculate rough word count and reading time
        const wordCount = markdown.split(/\s+/).filter(w => w.length > 0).length;
        const readingTime = Math.ceil(wordCount / 200);
        resultWordBadge.innerHTML = `<i class="fa-solid fa-book-open"></i> ${readingTime} min read <span style="font-size: 0.82em; opacity: 0.85; margin-left: 6px;">(${wordCount.toLocaleString()} words)</span>`;

        // Slice markdown into sections
        const parsedReportSections = parseReportSections(markdown);

        // Populate cards
        for (const sectionId in parsedReportSections) {
            const sectionContentText = parsedReportSections[sectionId];
            const contentHtml = compileMarkdownToHtml(sectionContentText);
            
            const cardBodyEl = document.getElementById(`section-${sectionId}`);
            if (cardBodyEl) {
                cardBodyEl.innerHTML = contentHtml;
            }
        }

        // Show Results Layout
        reportResults.style.display = 'block';
        actionToolbar.style.display = 'flex';
        
        // Scroll smoothly to results
        reportResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 12. Close Error Alert button
    closeErrorBtn.addEventListener('click', () => {
        errorAlert.style.display = 'none';
    });

    // 13. Toolbar Button Actions
    
    // Copy markdown report to clipboard
    copyBtn.addEventListener('click', async () => {
        if (!currentReportRawMarkdown) return;
        
        try {
            await navigator.clipboard.writeText(currentReportRawMarkdown);
            showToast("Report copied to clipboard!");
        } catch (err) {
            console.error('Clipboard copy failed:', err);
            // Fallback copy implementation
            const textArea = document.createElement("textarea");
            textArea.value = currentReportRawMarkdown;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                showToast("Report copied to clipboard!");
            } catch (fallbackErr) {
                showToast("Copy failed. Please manually select and copy text.", "error");
            }
            document.body.removeChild(textArea);
        }
    });

    // Download markdown file
    downloadBtn.addEventListener('click', () => {
        if (!currentReportRawMarkdown) return;

        try {
            // Clean topic string for file name
            const cleanFileName = currentResearchTopic.toLowerCase().replace(/[^a-z0-9]+/g, '_') || 'research_report';
            
            const blob = new Blob([currentReportRawMarkdown], { type: 'text/markdown;charset=utf-8' });
            const blobUrl = URL.createObjectURL(blob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `${cleanFileName}_report.md`;
            
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            URL.revokeObjectURL(blobUrl);
            showToast("Markdown report downloaded successfully!");
        } catch (err) {
            console.error('Download trigger failed:', err);
            showToast("Failed to compile file download.", "error");
        }
    });

    // Clear and reset dashboard back to home state
    clearBtn.addEventListener('click', () => {
        currentReportRawMarkdown = '';
        currentResearchTopic = '';
        
        // Reset Inputs
        topicInput.value = '';
        triggerInputStateChange();
        
        // Hide Results, Show Welcome
        reportResults.style.display = 'none';
        actionToolbar.style.display = 'none';
        welcomeState.style.display = 'flex';
        
        showToast("Dashboard reset successfully!");
    });

    // 14. Card Expansion Modal View Logic
    
    // Bind click handlers to cards dynamic delegate
    document.querySelector('.report-grid').addEventListener('click', (e) => {
        const expandBtn = e.target.closest('.expand-card-btn');
        if (!expandBtn) return;
        
        const card = expandBtn.closest('.report-card');
        if (!card) return;
        
        const sectionId = card.getAttribute('data-section');
        const headerTitle = card.querySelector('h3').textContent;
        const bodyContentHtml = card.querySelector('.card-body').innerHTML;
        
        modalTitleText.textContent = headerTitle;
        modalBodyContent.innerHTML = bodyContentHtml;
        
        // Keep correct section icon
        const iconClass = card.querySelector('.card-icon').className;
        expandedModal.querySelector('.modal-icon').className = iconClass + ' modal-icon';
        
        expandedModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    });

    function closeModal() {
        expandedModal.style.display = 'none';
        document.body.style.overflow = ''; // Unlock scrolling
    }

    closeModalBtn.addEventListener('click', closeModal);
    expandedModal.addEventListener('click', (e) => {
        if (e.target === expandedModal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && expandedModal.style.display === 'flex') {
            closeModal();
        }
    });

    // Recent Searches Handler
    const recentSearchesContainer = document.getElementById('recent-searches-container');
    const recentSearchesList = document.getElementById('recent-searches-list');

    function loadRecentSearches() {
        const searches = JSON.parse(localStorage.getItem('rp_recent_searches') || '[]');
        if (searches.length > 0 && recentSearchesContainer && recentSearchesList) {
            recentSearchesContainer.style.display = 'block';
            recentSearchesList.innerHTML = '';
            searches.forEach(search => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'suggestion-pill';
                button.innerHTML = `<i class="fa-solid fa-clock-rotate-left" style="font-size: 0.85em; opacity: 0.7; margin-right: 5px;"></i>${search}`;
                button.addEventListener('click', () => {
                    topicInput.value = search;
                    triggerInputStateChange();
                    researchForm.dispatchEvent(new Event('submit'));
                });
                recentSearchesList.appendChild(button);
            });
        } else if (recentSearchesContainer) {
            recentSearchesContainer.style.display = 'none';
        }
    }

    function saveRecentSearch(topic) {
        if (!topic || !topic.trim()) return;
        let searches = JSON.parse(localStorage.getItem('rp_recent_searches') || '[]');
        searches = searches.filter(s => s.toLowerCase() !== topic.toLowerCase());
        searches.unshift(topic);
        searches = searches.slice(0, 5);
        localStorage.setItem('rp_recent_searches', JSON.stringify(searches));
        loadRecentSearches();
    }

    // Initialize Recent Searches on load
    loadRecentSearches();
});
