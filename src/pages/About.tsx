
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Zap, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your documents are processed securely in your browser and never stored on our servers."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Our optimized algorithms ensure quick processing without compromising quality."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Designed with simplicity in mind, our tools are accessible to users of all skill levels."
    },
    {
      icon: Globe,
      title: "Universally Accessible",
      description: "Works on any device with a modern browser – no software installation required."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>About PDF Tools - Your Trusted Online PDF Solution</title>
        <meta name="description" content="Learn about our mission to provide free, secure, and professional PDF tools for everyone. No watermarks, no registration required." />
        <meta name="keywords" content="about PDF tools, free PDF editor, online PDF converter, secure PDF processing" />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-6">About PDF Tools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to make professional PDF processing accessible to everyone, 
            completely free and without compromise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-gray dark:prose-invert">
              <p className="text-justify leading-relaxed mb-4">
                PDF Tools was born from a simple frustration: the lack of reliable, free online tools 
                for working with PDF documents. Too many existing solutions either charged hefty fees, 
                added unwanted watermarks, or compromised user privacy by storing documents on remote servers.
              </p>
              <p className="text-justify leading-relaxed mb-4">
                We believe that essential document tools should be accessible to everyone – students, 
                professionals, small businesses, and individuals alike. That's why we created a 
                comprehensive suite of PDF tools that are completely free, secure, and professional-grade.
              </p>
              <p className="text-justify leading-relaxed">
                Our platform processes over 2 million documents monthly, helping users worldwide 
                streamline their document workflows without barriers or limitations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="prose prose-gray dark:prose-invert">
              <p className="text-justify leading-relaxed mb-4">
                <strong>To democratize document processing</strong> by providing powerful, secure, and 
                user-friendly PDF tools that anyone can use without cost, registration, or privacy concerns.
              </p>
              <p className="text-justify leading-relaxed mb-4">
                We're committed to maintaining the highest standards of security and privacy while 
                delivering enterprise-quality results. Every tool we build is designed with three 
                core principles in mind:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Complete Privacy:</strong> Your documents never leave your device</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Professional Quality:</strong> Results that meet business standards</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Universal Access:</strong> Free tools for everyone, forever</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center bg-muted/30 rounded-lg p-8"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Be part of millions of users who trust PDF Tools for their document processing needs. 
            Experience the difference that truly free, professional tools can make.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2M+</div>
              <div>Monthly Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50M+</div>
              <div>Documents Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">29</div>
              <div>PDF Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div>Free Forever</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
