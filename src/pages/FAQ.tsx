
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const faqCategories = [
    {
      title: "General Questions",
      questions: [
        {
          question: "Are your PDF tools really free?",
          answer: "Yes, absolutely! All our PDF tools are completely free to use with no hidden charges, subscription fees, or premium tiers. We believe in providing professional-quality PDF processing tools accessible to everyone."
        },
        {
          question: "Do I need to create an account to use the tools?",
          answer: "No account registration is required. You can use all our tools immediately without providing any personal information. Simply visit the tool page and start processing your PDFs right away."
        },
        {
          question: "Is there a limit on file size or number of files I can process?",
          answer: "We don't impose artificial limits on file sizes or the number of files you can process. However, very large files (over 100MB) may take longer to process depending on your device and internet connection."
        },
        {
          question: "Do you add watermarks to processed PDFs?",
          answer: "No, we never add watermarks to your processed documents. Your PDFs remain clean and professional, exactly as you need them for business or personal use."
        }
      ]
    },
    {
      title: "Security & Privacy",
      questions: [
        {
          question: "How secure are my documents when using your tools?",
          answer: "Your documents are completely secure. All processing happens directly in your browser using client-side technology. Your files never leave your device and are not uploaded to our servers or stored anywhere online."
        },
        {
          question: "Do you store or have access to my PDF files?",
          answer: "No, we have no access to your files. Our tools process everything locally in your browser. Once you close the browser tab, any temporary data is automatically cleared from your device's memory."
        },
        {
          question: "Can I use these tools for confidential documents?",
          answer: "Yes, our tools are safe for confidential documents since they operate entirely on your device. No data transmission occurs, making them suitable for sensitive legal, medical, or business documents."
        },
        {
          question: "Do you track what files I process?",
          answer: "We don't track, log, or monitor any of your file processing activities. We may collect general usage statistics (like page visits) for website improvement, but never any information about your documents."
        }
      ]
    },
    {
      title: "Technical Support",
      questions: [
        {
          question: "What browsers are supported?",
          answer: "Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser."
        },
        {
          question: "Why is my large PDF taking a long time to process?",
          answer: "Processing time depends on file size, complexity, and your device's processing power. Large files (over 50MB) or those with many images may take longer. Ensure you have sufficient RAM available and close unnecessary browser tabs."
        },
        {
          question: "Can I use these tools on my mobile device?",
          answer: "Yes! Our tools are fully responsive and work on smartphones and tablets. However, for large files or complex operations, desktop computers typically provide better performance."
        },
        {
          question: "What should I do if a tool isn't working properly?",
          answer: "First, try refreshing the page and attempting the operation again. Ensure you're using a supported file format (PDF). If issues persist, please contact our support team with details about your browser, device, and the specific error you're encountering."
        }
      ]
    },
    {
      title: "File Formats & Compatibility",
      questions: [
        {
          question: "What file formats do you support?",
          answer: "Our primary focus is PDF files. We also support common image formats (JPG, PNG) for conversion to PDF, and document formats (Word, Excel, PowerPoint) for PDF conversion where applicable."
        },
        {
          question: "Can you process password-protected PDFs?",
          answer: "Some tools can work with password-protected PDFs if you provide the password. However, we cannot remove or bypass password protection without the correct password for security reasons."
        },
        {
          question: "Do you maintain the original quality of my documents?",
          answer: "Yes, we prioritize maintaining original quality. Our tools preserve formatting, fonts, images, and layout integrity. For compression tools, we use intelligent algorithms that balance file size reduction with quality preservation."
        },
        {
          question: "Can I process scanned PDFs?",
          answer: "Yes, most of our tools work with scanned PDFs. However, for text-based operations (like editing or text extraction), scanned PDFs may require OCR processing first to convert images to searchable text."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>FAQ - Frequently Asked Questions about PDF Tools</title>
        <meta name="description" content="Find answers to common questions about our free PDF tools, security, file processing, and technical support." />
        <meta name="keywords" content="PDF tools FAQ, help, support, questions, PDF processing help" />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to common questions about our PDF tools, 
            security practices, and technical support.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {category.questions.map((faq, questionIndex) => (
                      <AccordionItem 
                        key={questionIndex} 
                        value={`item-${categoryIndex}-${questionIndex}`}
                      >
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          <p className="text-justify leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center bg-muted/30 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <div className="flex justify-center">
            <a 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;
