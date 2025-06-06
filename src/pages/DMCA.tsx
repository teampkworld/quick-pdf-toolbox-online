
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DMCA = () => {
  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>DMCA Copyright Policy - PDF Tools</title>
        <meta name="description" content="Our DMCA copyright policy and procedures for reporting copyright infringement on PDF Tools." />
        <meta name="keywords" content="DMCA, copyright policy, intellectual property, takedown notice" />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-6">DMCA Copyright Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We respect intellectual property rights and comply with the Digital Millennium Copyright Act.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-justify leading-relaxed mb-4">
                  <strong>PDF Tools does not store, host, or have access to user-uploaded content.</strong> All PDF 
                  processing occurs entirely within the user's browser using client-side technology. We do not 
                  maintain copies of any documents processed through our tools.
                </p>
                <p className="text-justify leading-relaxed">
                  However, we recognize that our website content and tools themselves are protected by copyright, 
                  and we respect the intellectual property rights of others. This DMCA policy outlines our 
                  procedures for addressing copyright concerns.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Reporting Copyright Infringement</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-justify leading-relaxed mb-4">
                  If you believe that content on our website infringes your copyright, please provide our 
                  designated agent with the following information:
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Required Information for DMCA Notice</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">1</span>
                    <span><strong>Identification of the copyrighted work</strong> claimed to have been infringed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">2</span>
                    <span><strong>Identification of the material</strong> that is claimed to be infringing and its location on our website</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">3</span>
                    <span><strong>Your contact information</strong> including address, telephone number, and email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">4</span>
                    <span><strong>A statement of good faith belief</strong> that the use is not authorized by the copyright owner</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">5</span>
                    <span><strong>A statement of accuracy</strong> made under penalty of perjury that you are authorized to act</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm font-semibold mr-3 flex-shrink-0 mt-0.5">6</span>
                    <span><strong>Your physical or electronic signature</strong></span>
                  </li>
                </ul>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Designated DMCA Agent
                  </h4>
                  <p className="mb-2"><strong>Email:</strong> dmca@pdftools.com</p>
                  <p className="text-sm text-muted-foreground">
                    Please use "DMCA Takedown Request" as the subject line
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Counter-Notification Process</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-justify leading-relaxed mb-4">
                  If you believe your content was wrongly removed due to a DMCA notice, you may submit a 
                  counter-notification containing:
                </p>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Your physical or electronic signature</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Identification of the material and its former location</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>A statement under penalty of perjury that the material was removed by mistake</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Your name, address, phone number, and consent to jurisdiction</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Repeat Infringer Policy</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-justify leading-relaxed mb-4">
                  We maintain a policy of terminating access to our services for users who are repeat 
                  copyright infringers. While our tools don't require user accounts, we may block access 
                  from IP addresses or implement other technical measures to prevent repeated infringement.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center bg-muted/30 rounded-lg p-8"
          >
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Questions About Copyright?</h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about our copyright policy or need assistance with a DMCA notice, 
              our legal team is here to help.
            </p>
            <Button asChild>
              <a href="/contact">Contact Legal Team</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DMCA;
