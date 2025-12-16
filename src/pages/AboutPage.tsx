import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="pt-24 md:pt-40 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl shadow-xl p-6 md:p-10 animate-fade-in-up border-2 border-amber-400">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-amber-400 text-center animate-fade-in-up"><span className="text-white">About</span> CustodyBuddy.com</h1>
                    <div className="text-gray-400 text-lg leading-relaxed space-y-6 prose prose-invert prose-p:my-2 prose-strong:text-amber-300 max-w-none">

                        <p className="text-xl">
                            <strong>Our mission is to empower self-represented parents with the tools and information they need to navigate the complexities of high-conflict co-parenting and the family law system.</strong>
                        </p>
                        <p>
                            We believe every parent deserves the ability to present their case clearly and factually—free from emotional manipulation and strategic abuse. CustodyBuddy exists to turn stress into strategy and to provide clarity when the system feels overwhelming.
                        </p>
                        
                        <div className="border-t border-slate-700 my-8"></div>

                        <h2 className="text-3xl font-bold text-amber-400 text-center animate-fade-in-up">A Note from Our Founder</h2>

                        <p>
                            CustodyBuddy.com was born out of necessity and forged through lived experience.
                        </p>
                        <p>
                            My name is Danielle Pike, and I am the founder of this platform. I am also a legally blind mother of two wonderful autistic children and a survivor of post-separation abuse.
                        </p>
                        <p>
                            Navigating the family law system is daunting for anyone. Doing so with a visual disability while co-parenting with a toxic ex felt like an insurmountable challenge. The constant stream of manipulative communication, dense legal documents, and emotional exhaustion was overwhelming. I knew I needed a better way to fight for my children—and to protect my own stability.
                        </p>
                        <p>
                            That’s when I discovered the power of intelligent systems.
                        </p>
                        <p>
                            These tools became my equalizer. They helped me read and summarize complex legal materials, analyze hostile communications to extract objective facts, and draft responses that were calm, professional, and strategic—without feeding the conflict my ex was trying to provoke. They became a reliable research and organization system, allowing me to fact-check information and prepare my case with greater confidence.
                        </p>
                        <p>
                            This was more than a legal aid—it was a turning point for my mental health. By filtering out noise and focusing on facts, I was able to regain control and make decisions from a place of clarity rather than survival.
                        </p>
                        <p>
                            I created CustodyBuddy.com to share that clarity with you.
                        </p>
                        <p>
                            My experience drives our core commitment: to deliver strictly factual, educational, and evidence-focused intelligent tools. We are uncompromising when it comes to accuracy, and we design our systems to provide clear, dependable information—without speculation or unreliable outputs that can cause harm in legal situations.
                        </p>
                        <p>
                            We are not lawyers, and this is not legal advice. We are a shield, a translator, and a strategic partner—here to help you organize your evidence, communicate effectively, and build the strongest possible case to protect what matters most.
                        </p>
                        <p className="font-semibold text-center text-amber-300">
                            You are not alone. Let’s build your case, together.
                        </p>
                        <p className="text-center font-bold text-white text-xl">
                            — Danielle Pike
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;