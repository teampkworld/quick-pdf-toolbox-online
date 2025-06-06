
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  const privacyHighlights = [
    {
      icon: Lock,
      title: "No Data Collection",
      description: "We don't collect, store, or transmit your personal files"
    },
    {
      icon: Shield,
      title: "Local Processing",
      description: "All PDF processing happens in your browser"
    },
    {
      icon: Eye,
      title: "Zero Tracking",
      description: "No tracking of your document content or processing activities"
    },
    {
      icon: Database,
      title: "No Server Storage",
      description: "Your files never leave your device or get stored online"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>Privacy Policy - PDF Tools</title>
        <meta name="description" content="Our privacy policy explains how we protect your data. We don't store your files or track your activities." />
        <meta name="keywords" content="privacy policy, data protection, PDF tools privacy, secure PDF processing" />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is our top priority. Learn how we protect your data and documents.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Privacy Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {privacyHighlights.map((item, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Detailed Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
              <p className="text-justify leading-relaxed mb-4">
                <strong>We do not collect any personal information.</strong> Our PDF tools operate entirely within your browser, 
                and we have no mechanism to access, collect, or store personal data such as names, email addresses, 
                or contact information unless you voluntarily provide it through our contact form.
              </p>

              <h3 className="text-lg font-semibold mb-3">Document Content</h3>
              <p className="text-justify leading-relaxed mb-4">
                <strong>We never access your document content.</strong> All PDF processing happens locally in your browser 
                using client-side JavaScript technology. Your files are never uploaded to our servers, transmitted over 
                the internet, or stored in any remote location. When you close your browser tab, any temporary data 
                is automatically cleared from your device's memory.
              </p>

              <h3 className="text-lg font-semibold mb-3">Usage Analytics</h3>
              <p className="text-justify leading-relaxed">
                We may collect basic, non-identifying usage statistics such as page views, tool usage frequency, 
                and general performance metrics to improve our services. This data is anonymous and cannot be linked 
                to individual users or specific documents. We use standard web analytics tools that respect user 
                privacy and comply with data protection regulations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Protect Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Client-Side Processing</h3>
              <p className="text-justify leading-relaxed mb-4">
                Our PDF tools use advanced client-side technology, meaning all processing occurs within your browser 
                on your device. This architecture ensures that your documents never leave your computer, providing 
                the highest level of security and privacy possible for online document processing.
              </p>

              <h3 className="text-lg font-semibold mb-3">No Data Transmission</h3>
              <p className="text-justify leading-relaxed mb-4">
                Unlike traditional online services that upload files to remote servers, our tools process everything 
                locally. There is no data transmission of your document content to our servers or any third-party services. 
                This eliminates the risk of data interception, unauthorized access, or accidental data breaches.
              </p>

              <h3 className="text-lg font-semibold mb-3">Secure Connection</h3>
              <p className="text-justify leading-relaxed">
                Our website uses HTTPS encryption to ensure that any communication between your browser and our 
                servers is secure. While your documents never leave your device, this encryption protects any 
                website interaction data and ensures the integrity of our application code.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Local Storage</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-justify leading-relaxed mb-4">
                We use minimal cookies and local storage only for essential website functionality, such as:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Remembering your theme preference (light/dark mode)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Maintaining basic website functionality and user experience improvements</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Anonymous usage analytics to help us improve our services</span>
                </li>
              </ul>
              <p className="text-justify leading-relaxed">
                <strong>We never use cookies to track your document processing activities or store any information 
                about the files you process.</strong> You can disable cookies in your browser settings, though this may 
                affect some website functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-3">Analytics Services</h3>
              <p className="text-justify leading-relaxed mb-4">
                We may use third-party analytics services to understand how our website is used and to improve 
                our services. These services collect only anonymous, aggregated data about website visits and 
                do not have access to your document content or processing activities.
              </p>

              <h3 className="text-lg font-semibold mb-3">Content Delivery Networks (CDN)</h3>
              <p className="text-justify leading-relaxed mb-4">
                We use CDN services to deliver our website content quickly and reliably. These services do not 
                have access to your document content and only serve the static website files necessary for our 
                tools to function.
              </p>

              <h3 className="text-lg font-semibold mb-3">No Data Sharing</h3>
              <p className="text-justify leading-relaxed">
                We do not sell, trade, or share any user data with third parties for marketing or commercial purposes. 
                Since we don't collect personal information or document content, there is no sensitive data to share 
                even if we wanted to.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-justify leading-relaxed mb-4">
                Since we don't collect or store personal information, there is no personal data to access, modify, 
                or delete. However, you have the following rights:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Complete Control:</strong> Your documents never leave your device, giving you complete control over your data</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>No Account Required:</strong> Use our services without creating accounts or providing personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Opt-Out:</strong> Disable cookies or analytics through your browser settings at any time</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Inquiries:</strong> Contact us with any privacy questions or concerns</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-justify leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal 
                requirements. Any changes will be posted on this page with an updated "Last modified" date. 
                We encourage you to review this policy periodically.
              </p>
              <p className="text-justify leading-relaxed">
                <strong>Material Changes:</strong> If we make any material changes to how we handle data (though this is 
                unlikely given our privacy-first architecture), we will provide prominent notice on our website 
                before the changes take effect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-justify leading-relaxed mb-4">
                If you have any questions, concerns, or suggestions regarding this Privacy Policy or our privacy 
                practices, please don't hesitate to contact us:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Email:</strong> privacy@pdftools.com</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Contact Form:</strong> <a href="/contact" className="text-primary hover:underline">Use our secure contact form</a></span>
                </li>
              </ul>
              <p className="text-justify leading-relaxed mt-4">
                We are committed to addressing your privacy concerns promptly and transparently.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
