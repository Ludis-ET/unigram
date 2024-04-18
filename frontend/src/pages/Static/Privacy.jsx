import React from "react";

export const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <p className="text-lg leading-loose mb-4">
        This Privacy Policy describes how we collect, use, and disclose your
        personal information when you use our services and applies to all users
        of our platform.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

      <ul className="list-disc pl-4 mb-4">
        <li className="text-lg">Personal Information:</li>
        <li className="text-lg pl-2">
          We may collect personal information that you provide to us, such as
          your name, email address, and any other information you choose to
          share.
        </li>
        <li className="text-lg">Usage Data:</li>
        <li className="text-lg pl-2">
          We may collect information about how you use our services, such as the
          pages you visit and the features you access.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        How We Use Your Information
      </h2>

      <ul className="list-disc pl-4 mb-4">
        <li className="text-lg">To provide and improve our services</li>
        <li className="text-lg">To send you administrative communications</li>
        <li className="text-lg">To respond to your inquiries and requests</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        Disclosure of Your Information
      </h2>

      <p className="text-lg leading-loose mb-4">
        We may disclose your information to third-party service providers who
        help us operate our services. We will only disclose your information to
        these providers for the purpose of providing the services and they are
        obligated to protect your information.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>

      <p className="text-lg leading-loose mb-4">
        You have choices about how we collect and use your information. You can
        choose to:
      </p>

      <ul className="list-disc pl-4 mb-4">
        <li className="text-lg">Request access to your information</li>
        <li className="text-lg">Request that we delete your information</li>
      </ul>

      <p className="text-lg leading-loose mb-4">
        You can contact us at [email protected] to exercise any of these
        choices.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Security</h2>

      <p className="text-lg leading-loose"></p>
    </div>
  );
};
