import { LeftBar } from "../Home";
export const Terms = () => {
  return (
    <div>
      <LeftBar />
      <div className="md:ml-[280px] mx-8 ">
        <div className="text-dark">
          <header>
            <h1 className="flex  mx-auto font-mono text-3xl justify-center text-red-500 ">
              Privacy Policy
            </h1>
          </header>
          <main className="dark:text-white">
            <section className="flex-col  w-[90%] dark:text-white h-[20vh] shadow-md mx-auto font-mono  ">
              <h2 className="flex mx-auto text-2xl  text-red-600 font-mono ">
                Introduction
              </h2>
              <p className="dark:text-white">
                This is the privacy policy for our website. It explains how we
                collect, use, and protect your personal information. By using
                this website, you agree to the terms of this policy.
              </p>
            </section>
            <section className="flex-col  w-[90%] h-[20vh] mx-auto shadow-md ">
              <h2 className="flex mx-auto text-2xl text-red-600 font-mono">
                Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email
                address, and phone number when you fill out a contact form or
                subscribe to our newsletter. We use this information to
                communicate with you and provide the services you requested.
              </p>
            </section>
            <section className="flex-col  w-[90%] h-[20vh] mx-auto shadow-md ">
              <h2 className="flex mx-auto text-2xl  text-red-600 font-mono ">
                How We Use Your Information
              </h2>
              <p>
                We use your information to respond to your inquiries, provide
                customer support, and improve our website and services. We may
                also use your information to send you promotional emails or
                newsletters, but you can opt out at any time.
              </p>
            </section>
            <section className="flex-col w-[90%]  mx-auto shadow-md h-[20vh]">
              <h2 className="flex mx-auto text-2xl font-mono text-rose-600 ">
                Security
              </h2>
              <p>
                We take reasonable measures to protect your personal information
                from unauthorized access or disclosure. However, please note
                that no method of transmission over the internet or electronic
                storage is 100% secure.
              </p>
            </section>
            <section className="flex-col w-[90%] h-[20vh] shadow-md mx-auto font-mono  ">
              <h2 className="flex mx-auto text-2xl font-mono text-red-600 ">
                Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of those
                websites. We encourage you to read the privacy policies of any
                third-party sites you visit.
              </p>
            </section>
            <section className="flex-col w-[90%] h-[20vh] shadow-md mx-auto font-mono  ">
              <h2 className="flex font-mono text-2xl text-red-600">
                Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. Any changes
                will be posted on this page, and the date at the top will
                indicate the latest revision. We encourage you to review this
                policy periodically.
              </p>
            </section>
          </main>
          <footer className="flex mx-auto justify-center">
            <p className="text-xl dark:text-white">
              &copy; 2024 UniGram. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
