import React from "react";
import { Pencil, Type, Square, Image, ArrowRight } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-100 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Pencil className="w-6 h-6 mr-2 text-blue-500" /> DesignStudio
        </h1>
        <div className="flex space-x-4">
          <a
            href="/login"
            className="px-4 py-2 text-gray-600 hover:text-blue-500">
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
            Get Started <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
            Create Stunning Designs with Ease
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Unleash your creativity with DesignStudio, the ultimate tool for
            crafting beautiful graphics, presentations, and more. No design
            experience needed!
          </p>
          <a
            href="/editor"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg flex items-center mx-auto w-fit">
            Start Designing Now <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="text-center">
            <Type className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Custom Text
            </h3>
            <p className="text-gray-600">
              Add and style text with a variety of fonts and effects.
            </p>
          </div>
          <div className="text-center">
            <Square className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Shapes & Graphics
            </h3>
            <p className="text-gray-600">
              Create with a library of shapes and customizable elements.
            </p>
          </div>
          <div className="text-center">
            <Image className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Image Editing
            </h3>
            <p className="text-gray-600">
              Upload and enhance images with powerful editing tools.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
