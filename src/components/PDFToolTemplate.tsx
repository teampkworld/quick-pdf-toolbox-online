
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface PDFToolTemplateProps {
  title: string;
  description: string;
  icon: LucideIcon;
  keywords: string;
  children: ReactNode;
  aboutContent: {
    whatIs: string;
    uses: string[];
    whyUse: string;
    howToUse: string[];
    example: string;
  };
}

const PDFToolTemplate = ({
  title,
  description,
  icon: Icon,
  keywords,
  children,
  aboutContent,
}: PDFToolTemplateProps) => {
  return (
    <div className="min-h-screen py-8">
      <Helmet>
        <title>{title} - Free Online PDF Tool</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://yoursite.com${window.location.pathname}`} />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Icon className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Tool Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Upload and Process Your PDF</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle>About {title}</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">What is {title}?</h2>
                  <p className="text-justify leading-relaxed">{aboutContent.whatIs}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">What are the uses of {title}?</h2>
                  <p className="text-justify leading-relaxed mb-3">
                    This tool is incredibly versatile and can be used in various scenarios:
                  </p>
                  <ul className="space-y-2">
                    {aboutContent.uses.map((use, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-justify">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Why should you use this tool?</h2>
                  <p className="text-justify leading-relaxed">{aboutContent.whyUse}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">How to use {title} (with example)</h2>
                  <p className="text-justify leading-relaxed mb-3">
                    Using our {title} tool is straightforward and user-friendly. Follow these simple steps:
                  </p>
                  <ol className="space-y-2 mb-4">
                    {aboutContent.howToUse.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-justify">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Example:</h3>
                    <p className="text-justify leading-relaxed">{aboutContent.example}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PDFToolTemplate;
