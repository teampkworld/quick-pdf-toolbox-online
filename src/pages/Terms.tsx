
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  const termsHighlights = [
    {
      icon: CheckCircle,
      title: "Free to Use",
      description: "All tools are completely free with no hidden charges"
    },
    {
      icon: Scale,
      title: "Fair Usage",
      description: "Reasonable usage limits to ensure service quality for all"
    },
    {
      icon: AlertCircle,
      title: "No Warranties",
      description: "Service provided 'as is' without guarantees"
    },
    {
      icon: FileText,
      title: "Your Content",
      description: "You retain all rights to your documents and files"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>Terms & Conditions - PDF Tools</title>
        <meta name="description" content="Terms and conditions for using PDF Tools. Learn about our usage policies and user responsibilities." />
        <meta name="keywords" content="terms and conditions, PDF tools terms, usage policy, legal terms" />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Scale className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using our PDF tools and services.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Terms Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {termsHighlights.map((item, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Detailed Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-justify leading-relaxed mb-4">
                By accessing and using PDF Tools ("the Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. These Terms & Conditions govern your use of our website and all 
                PDF processing tools provided therein.
              </p>
              <p className="text-justify leading-relaxed">
                <strong>If you do not agree to abide by the above, please do not use this service.</strong> Your 
                continued use of the Service constitutes acceptance of these terms and any future modifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">What We Provide</h3>
              <p className="text-justify leading-relaxed mb-4">
                PDF Tools provides a collection of free, browser-based tools for processing PDF documents. 
                Our services include but are not limited to: merging, splitting, compressing, converting, 
                editing, and organizing PDF files. All processing is performed client-side in your browser.
              </p>

              <h3 className="text-lg font-semibold mb-3">Service Availability</h3>
              <p className="text-justify leading-relaxed mb-4">
                We strive to maintain high service availability but do not guarantee uninterrupted access. 
                The Service may be temporarily unavailable due to maintenance, updates, or circumstances 
                beyond our control. We reserve the right to modify, suspend, or discontinue any part of 
                the Service at any time.
              </p>

              <h3 className="text-lg font-semibold mb-3">Technical Requirements</h3>
              <p className="text-justify leading-relaxed">
                Our tools require a modern web browser with JavaScript enabled. Performance may vary based 
                on your device capabilities, browser version, and file size. Large files may require 
                significant processing time and system resources.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Acceptable Use</h3>
              <p className="text-justify leading-relaxed mb-4">
                You agree to use our services only for lawful purposes and in accordance with these Terms. 
                You are responsible for ensuring that your use of the Service complies with applicable laws 
                and regulations in your jurisdiction.
              </p>

              <h3 className="text-lg font-semibold mb-3">Prohibited Activities</h3>
              <p className="text-justify leading-relaxed mb-4">You agree not to:</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Process documents containing illegal, harmful, or offensive content</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Attempt to reverse engineer, modify, or interfere with our tools</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Use automated systems to access the Service in a manner that creates excessive load</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Violate any applicable laws or infringe upon others' intellectual property rights</span>
                </li>
              </ul>

              <h3 className="text-lg font-semibold mb-3">Content Responsibility</h3>
              <p className="text-justify leading-relaxed">
                You are solely responsible for the content of any documents you process using our tools. 
                You represent and warrant that you have the necessary rights and permissions to process 
                any documents you upload, and that such processing does not violate any third-party rights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Your Content</h3>
              <p className="text-justify leading-relaxed mb-4">
                You retain all rights, title, and interest in any documents or content you process using 
                our tools. We do not claim any ownership rights to your content and do not store or access 
                your files beyond the temporary processing required to provide our services.
              </p>

              <h3 className="text-lg font-semibold mb-3">Our Service</h3>
              <p className="text-justify leading-relaxed mb-4">
                The PDF Tools website, including its design, code, tools, and content, is protected by 
                copyright and other intellectual property laws. You may not copy, modify, distribute, 
                or create derivative works based on our Service without explicit permission.
              </p>

              <h3 className="text-lg font-semibold mb-3">License to Use</h3>
              <p className="text-justify leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable license to use our Service for 
                personal and commercial purposes in accordance with these Terms. This license does not 
                include the right to resell, redistribute, or create competing services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Service Warranty</h3>
              <p className="text-justify leading-relaxed mb-4">
                <strong>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong> We make no 
                representations or warranties regarding the accuracy, reliability, or completeness of our 
                tools. You use the Service at your own risk.
              </p>

              <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
              <p className="text-justify leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, 
                LOSS OF PROFITS, OR BUSINESS INTERRUPTION.
              </p>

              <h3 className="text-lg font-semibold mb-3">Data Loss</h3>
              <p className="text-justify leading-relaxed">
                While our tools are designed to preserve your data, we strongly recommend keeping backup 
                copies of important documents. We are not responsible for any data loss, corruption, or 
                unintended modifications that may occur during processing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifications and Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Changes to Terms</h3>
              <p className="text-justify leading-relaxed mb-4">
                We reserve the right to modify these Terms & Conditions at any time. Changes will be effective 
                immediately upon posting to our website. Your continued use of the Service after any changes 
                constitutes acceptance of the new terms.
              </p>

              <h3 className="text-lg font-semibold mb-3">Service Modifications</h3>
              <p className="text-justify leading-relaxed mb-4">
                We may modify, update, or discontinue any aspect of our Service at any time without prior 
                notice. This includes adding new tools, removing existing tools, or changing functionality.
              </p>

              <h3 className="text-lg font-semibold mb-3">Termination</h3>
              <p className="text-justify leading-relaxed">
                We reserve the right to terminate or suspend access to our Service immediately, without 
                prior notice, for any reason, including breach of these Terms. Upon termination, your 
                right to use the Service will cease immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-justify leading-relaxed mb-4">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Email:</strong> legal@pdftools.com</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Contact Form:</strong> <a href="/contact" className="text-primary hover:underline">Use our contact form</a></span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
