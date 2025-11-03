import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Loader2, FileText, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios.js'; // ✅ Make sure this points to your axios setup

export default function AITextSummarizer() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ For debugging: Log whenever summary updates
  useEffect(() => {
    console.log('Summary updated:', summary);
  }, [summary]);

  // ✅ Handle Summarize Button Click
  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter text to summarize!');
      return;
    }

    setIsLoading(true);
    setSummary('');

    try {
      console.log('Sending prompt:', inputText);
      const res = await axiosInstance.post(
        '/ai-services/text-summarizer',
        { prompt: inputText },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('API Response:', res.data);

      const summaryText =
        res.data.summary || res.data.message || 'No summary returned.';

      setSummary(summaryText);
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate summary.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast.success('Summary copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setSummary('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-purple-400 animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-purple-400 opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              AI Summarizer
            </h1>
          </div>
          <p className="text-purple-200 text-lg md:text-xl">
            Transform lengthy text into concise, intelligent summaries
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-white font-semibold text-lg">
                <FileText className="w-5 h-5 text-purple-400" />
                Input Text
              </label>
              <span className="text-purple-300 text-sm">
                {inputText.length} characters
              </span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your text here..."
              className="w-full h-80 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
            />

            {/* Controls */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={handleSummarize}
                  disabled={!inputText.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Summarize
                    </>
                  )}
                </button>

                <button
                  onClick={handleClear}
                  className="bg-gray-800/50 text-purple-200 font-semibold py-3 px-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 border border-purple-500/30"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-white font-semibold text-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
                AI Summary
              </label>
              <span className="text-purple-300 text-sm">
                {summary.length} characters
              </span>
            </div>

            <div className="h-80 bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 overflow-y-auto relative">
              {summary && (
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 flex items-center gap-2 bg-gray-900/70 hover:bg-gray-800 text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5 rounded-lg text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              )}

              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto" />
                    <p className="text-purple-300 animate-pulse">
                      AI is analyzing your text...
                    </p>
                  </div>
                </div>
              ) : summary ? (
                <div className="text-white leading-relaxed animate-fade-in pr-20 whitespace-pre-line">
                  {summary}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 text-center">
                  <div className="space-y-2">
                    <Sparkles className="w-12 h-12 mx-auto opacity-50" />
                    <p>Your AI-generated summary will appear here</p>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            {summary && (
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-bold text-xl">
                    {Math.round((summary.length / inputText.length) * 100)}%
                  </div>
                  <div className="text-purple-200 text-xs">Reduction</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-bold text-xl">
                    {summary.split(' ').length}
                  </div>
                  <div className="text-purple-200 text-xs">Words</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-bold text-xl">
                    {summary.length}
                  </div>
                  <div className="text-purple-200 text-xs">Characters</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-purple-300/50 text-sm">
          Powered by Advanced AI Technology
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
