import React from 'react';
import { getAllCategories } from '@/lib/airtable';

  export async function getStaticProps() {
  const categories = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
}

export default function FoundationalModelsPage() {
  

  
  return (

  
      <div className="relative z-[10] max-w-4xl mx-auto w-full px-4 py-4">
        <h1 className="text-2xl font-bold mb-6">Foundational Models: Understanding the Core of Modern AI</h1>

        <p className="mb-6">The rise of AI tools and applications today can be traced back to a handful of foundational models that serve as the bedrock for everything from chatbots and image generation to data analysis and code completion. These models aren’t just powerful—they’re general-purpose systems that other tools are built on top of. Below, we break down six of the most important foundational models, explaining what each one does and why it matters.</p>

        <hr className="my-6" />
        <div className="flex items-center space-x-4">
          <img
            src="/logos/gpt.png"
            alt="GPT logo"
            className="h-10 w-10 object-contain"
          />
          <div className="h-16 flex items-center">
            <h1 className="text-2xl font-bold leading-none">1. GPT (OpenAI)</h1>
          </div>
        </div>
        <p><strong>Created by:</strong> <a href="https://openai.com/">OpenAI</a><br /><strong>Best Known For:</strong> ChatGPT, code generation, summarization</p>
        <br />
        <p className="mb-6">GPT is arguably the most widely recognized foundational model. Trained on a massive corpus of text, it predicts the next word in a sequence, allowing it to generate human-like responses. GPT models power a huge range of applications: customer support bots, writing assistants, coding copilots, and more.
          What makes GPT foundational is its adaptability. It can be fine-tuned or prompted to take on many different tasks without task-specific training.</p>
        <div className="flex items-center space-x-4">
          <img
            src="/logos/claude.png"
            alt="GPT logo"
            className="h-10 w-10 object-contain"
          />
          <div className="h-16 flex items-center">
            <h1 className="text-2xl font-bold leading-none">2. Claude</h1>
          </div>
        </div>
        <p><strong>Created by:</strong> <a href="https://anthropic.com/">Anthropic</a><br /><strong>Best Known For:</strong> Safer, more steerable conversations</p>
        <br />
        <p className="mb-6">Claude is similar to GPT but places greater emphasis on constitutional AI—a method that encodes values and ethical boundaries into the model via principles rather than hard-coded rules. This makes Claude appealing in settings where safety, moderation, and interpretability are priorities.
        Claude has become a strong alternative to GPT in tools that emphasize ethical or instructable behavior.</p>
        <div className="flex items-center space-x-4">
          <img
            src="/logos/gemini.png"
            alt="Gemini logo"
            className="h-10 w-10 object-contain"/>
          <div className="h-16 flex items-center">
            <h1 className="text-2xl font-bold leading-none">3. Gemini (Formerly Bard)</h1>
          </div>
        </div>
        <p><strong>Created by:</strong> <a href="https://deepmind.google/">Google Deep Mind</a><br /><strong>Best Known For:</strong> Integration with Google Workspace, web-aware search</p>
                <br />
        <p className="mb-6">Gemini is Google's evolution of the Bard model, designed to blend traditional language modeling with up-to-date web results. It plays a major role in Google Docs, Gmail, and search-enhanced products.
        Its core strength lies in real-time information retrieval and tight integration with existing workflows.</p>
        <div className="flex items-center space-x-4">
          <img
            src="/logos/mistral.png"
            alt="Mistral logo"
            className="h-10 w-10 object-contain"/>
          <div className="h-16 flex items-center">
            <h1 className="text-2xl font-bold leading-none">4. Mistral</h1>
          </div>
        </div>
        <p><strong>Created by:</strong> <a href="https://Mistral.ai/">Mistral</a><br /><strong>Best Known For:</strong> Open-weight models, performance in multilingual tasks</p>
                <br />
        <p className="mb-6">Mistral focuses on small, high-performance language models that are released openly to the public. These models are optimized for efficiency and multilingual support, making them popular in academic and enterprise settings alike.</p>
        Mistral’s open-source stance helps democratize access to cutting-edge AI without requiring a proprietary ecosystem.
        <div className="flex items-center space-x-4">
          <img
            src="/logos/llama.png"
            alt="LLaMA logo"
            className="h-10 w-10 object-contain"
          />
          <div className="h-16 flex items-center">
            <h1 className="text-2xl font-bold leading-none">5. LLaMA (Large Language Model Meta AI)</h1>
          </div>
        </div>
        <p><strong>Created by:</strong> <a href="https://meta.com/">Meta (FaceBook)</a><br /><strong>Best Known For:</strong> Research-driven open access, strong performance at scale</p>
                <br />
        <p className="mb-6">LLaMA models are Meta’s contribution to the open-source foundation model ecosystem. LLaMA 2, in particular, has gained traction for its balance of size, speed, and performance in many NLP tasks.
        It serves as a building block for many derivative models used in academia and lightweight commercial applications.</p>
        <div className="flex items-center space-x-4">
          <img
            src="/logos/dall-e.png"
            alt="DALL-E logo"
            className="h-10 w-10 object-contain"
          />
          <div className="h-16 flex items-center">
            <h1 className="text-2xl font-bold leading-none">6. DALL·E</h1>
          </div>
        </div>
        <p><strong>Created by:</strong> <a href="https://openai.com/">OpenAI</a><br /><strong>Best Known For:</strong> Image generation from text prompts</p>
             <br />
        <p className="mb-6">Unlike the others, DALL·E is a text-to-image model. It generates visual content based on written descriptions and is often used in design, illustration, and creative content workflows.
        It represents how foundational models can be multimodal, extending beyond just text to manipulate and generate images, audio, and video.</p>

        <hr className="my-6" />

        <h2 className="text-2xl font-bold mt-10 mb-4">Why Foundational Models Matter</h2>
        <p className="mb-6">These models are called "foundational" because they’re not trained for one job—they enable many. Tools like Jasper, Notion AI, Midjourney, and GitHub Copilot are all built on top of one or more of these foundational systems. Understanding the strengths and characteristics of each helps professionals choose the right platform to build on.</p>

        <p className="mb-6">Whether you’re developing new tools, deploying AI in business workflows, or just exploring capabilities, foundational models are where it all begins.</p>
      </div>

  );
}