import os
import google.generativeai as genai
from google.api_core.exceptions import GoogleAPIError

class GeminiService:
    """
    A service class to handle configuration, prompt construction, and execution
    of queries to the Gemini API.
    """

    def __init__(self, api_key: str = None):
        """
        Initializes the service with the given API key. If no key is provided,
        it attempts to fetch it from environment variables.
        """
        self.api_key = api_key or os.environ.get('GEMINI_API_KEY')
        self.model_name = 'gemini-2.5-flash'  # Using the recommended model for standard text tasks
        
        # Configure the Google Generative AI client if an API key is available
        if self.api_key:
            genai.configure(api_key=self.api_key)
        else:
            # We don't raise an exception immediately, allowing the service to be initialized,
            # but calls to generate reports will check and raise an error if key is still missing.
            pass

    def build_research_prompt(self, topic: str, depth: str) -> str:
        """
        Generates a highly structured prompt to instruct Gemini to generate the report.
        
        Parameters:
            topic (str): The research topic entered by the user.
            depth (str): The research depth ('quick', 'detailed', or 'comprehensive').
            
        Returns:
            str: The fully constructed prompt containing styling and structure rules.
        """
        # Determine depth instructions
        depth_instructions = ""
        if depth == 'quick':
            depth_instructions = (
                "Provide a concise, high-level overview. Keep the explanations clear, "
                "direct, and focused on core aspects, totaling roughly 400-700 words."
            )
        elif depth == 'detailed':
            depth_instructions = (
                "Provide a detailed and rigorous analysis of the topic. Cover sub-themes, "
                "architectural patterns, and structural differences. Target roughly 1000-1500 words."
            )
        elif depth == 'comprehensive':
            depth_instructions = (
                "Provide a comprehensive, exhaustive study guide. Dive deep into inner workings, "
                "detailed theories, historical context, step-by-step processes, and rich code or "
                "architectural examples where appropriate. Target roughly 1800-2500 words."
            )
        else:
            # Fallback default
            depth_instructions = "Provide a well-rounded and clear research report."

        # Strict nine-section prompt template
        prompt = f"""
You are a highly structured and objective research assistant.
Your task is to generate a comprehensive and professional research report on the topic: "{topic}".

Your research depth level is: {depth.upper()} ({depth_instructions})

CRITICAL FORMATTING INSTRUCTIONS:
1. You must write the report using valid Markdown.
2. Do not write any conversational intro (like "Here is your report on...") or outro. Start immediately with the markdown report.
3. You must split your response EXACTLY into the following 9 sections, using the exact heading names provided below (Level 2 Markdown Headers, e.g., '## Section Name'):

## Overview
Provide a clear definition, background, and summary of the topic. Explain why it is important.

## Key Concepts
Explain the core terminologies, fundamental principles, architectural styles, or key pillars. If relevant, explain how they interact with each other. Use bullet points or tables for readability.

## Real World Applications
Provide 2-3 detailed, concrete real-world use cases or case studies where this topic is applied. Explain the problem solved and the benefits gained.

## Latest Trends
Discuss current state-of-the-art developments, advancements, modern frameworks, and what is currently happening in the industry regarding this topic as of 2026.

## Interview Questions
List 3-5 high-quality, conceptual, or practical interview questions related to this topic. For each question, provide a detailed answer guide or key points that an interviewer looks for.

## Learning Resources
List curated, high-quality resources to study this topic further (e.g., official docs, online search paths/keywords, notable books, open-source projects). Do not include broken or fake URLs, instead give clear descriptions.

## Quick Revision Notes
Provide a concise, bulleted list of 5-8 key takeaways for last-minute review.

## Quiz
Include a 3-question multiple-choice or short-answer quiz. Provide the questions, followed by the correct answers and a brief explanation for each at the bottom of the section.

## Suggested Next Topics
List 3-4 logically connected topics that the researcher should learn next to build a deeper understanding, with a one-sentence reason for each.
"""
        return prompt

    def generate_research_report(self, topic: str, depth: str) -> str:
        """
        Interacts with the Gemini API to generate the research report.
        
        Parameters:
            topic (str): The research topic.
            depth (str): The research depth ('quick', 'detailed', or 'comprehensive').
            
        Returns:
            str: The generated Markdown report.
            
        Raises:
            ValueError: If inputs are invalid or the API key is missing.
            RuntimeError: If the Gemini API call fails due to network or service issues.
        """
        # Validate inputs
        if not topic or not topic.strip():
            raise ValueError("Research topic cannot be empty.")
            
        if depth not in ['quick', 'detailed', 'comprehensive']:
            raise ValueError("Invalid research depth specified. Must be 'quick', 'detailed', or 'comprehensive'.")

        if not self.api_key:
            raise ValueError(
                "Gemini API key is missing. Please set the GEMINI_API_KEY environment variable "
                "in your .env file or initialize the service with a key."
            )

        # 1. Build the prompt
        prompt = self.build_research_prompt(topic, depth)

        # 2. Make the API Call with error handling
        try:
            model = genai.GenerativeModel(self.model_name)
            response = model.generate_content(prompt)
            
            # Verify if response has valid text output
            if not response or not response.text:
                raise RuntimeError("Received an empty response from Gemini API.")
                
            return response.text

        except GoogleAPIError as api_err:
            # Handle Google Generative AI API-specific exceptions (invalid key, quota limits, blocked content)
            error_message = str(api_err)
            if "API_KEY_INVALID" in error_message or "invalid API key" in error_message.lower():
                raise RuntimeError("Invalid Gemini API Key provided. Please check your credentials in the .env file.")
            elif "quota" in error_message.lower():
                raise RuntimeError("Gemini API quota exceeded. Please try again later.")
            else:
                raise RuntimeError(f"Gemini API Error: {error_message}")
                
        except Exception as e:
            # Handle network issues, connection timeouts, or unexpected system errors
            raise RuntimeError(f"Network or system connection error while calling Gemini API: {str(e)}")
