<template>
  <div class="flex flex-col items-start w-full gap-4 p-4 mb-4 max-h-[480px] overflow-y-auto">
    <header class="flex flex-col items-start w-full gap-2 py-4 border-b">
      <h3 class="font-semibold">Last Updated: 14 December 2024</h3>
      <p>
        Welcome to the Choice Application. By using this application, you agree to the following Terms & Conditions. If you do not agree to these terms, please refrain from using the application.
      </p>
    </header>
    <main class="flex flex-col items-start w-full">
      <section class="w-full py-4 border-b">
        <h3 class="font-semibold">1. Purpose of the Application</h3>
        <p>
          The Choice Application is developed for academic purposes as part of a college project. It serves as a Decision Support System to assist in selecting laptops using the Simple Additive Weighting (SAW) method. The application is not intended for commercial use or as a definitive decision-making tool.
        </p>
      </section>
      <section class="w-full py-4 border-b">
        <h3 class="font-semibold">2. User Responsibility</h3>
        <ul class="ml-5 list-disc">
          <li>Users are responsible for ensuring the accuracy of the data they input.</li>
          <li>Recommendations provided by the application are illustrative and should not replace professional advice.</li>
          <li>Users are encouraged to perform additional research before making any decisions based on the application's output.</li>
        </ul>
      </section>
      <section class="w-full py-4 border-b">
        <h3 class="font-semibold">3. Privacy and Data Usage</h3>
        <p>
          No sensitive personal data is collected, stored, or shared by the application. Data entered by users is temporarily used for calculations and is not retained after the session ends.
        </p>
      </section>
      <section class="w-full py-4 border-b">
        <h3 class="font-semibold">4. Limitation of Liability</h3>
        <p>
          The developer does not guarantee the accuracy or reliability of the application's output. The developer is not liable for any decisions made based on the recommendations provided by the application. The application is provided "as is" without any warranties, express or implied.
        </p>
      </section>
      <section class="w-full py-4 border-b">
        <h3 class="font-semibold">5. Usage Restrictions</h3>
        <ul class="ml-5 list-disc">
          <li>Users must not misuse the application or use it for unlawful purposes.</li>
          <li>Reverse engineering, decompiling, or unauthorized modification of the application is prohibited.</li>
        </ul>
      </section>
      <section class="w-full py-4 border-b">
        <h3 class="font-semibold">6. Changes to the Terms</h3>
        <p>
          The developer reserves the right to modify these Terms & Conditions at any time without prior notice. It is the user's responsibility to review the Terms periodically.
        </p>
      </section>
      <section class="w-full py-4">
        <h3 class="font-semibold">7. Termination</h3>
        <p>
          The developer may suspend or terminate access to the application if users violate these Terms & Conditions.
        </p>
      </section>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'TermsConditions'
  }
</script>