import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';

const ContactUs = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <NavigationBar />
        </div>
        <div>
          <ContactForm />
        </div>
        <div className="py-3 border-t-1 mt-auto border-[#5c5c5c] shadow-2xl shadow-[#ffcab5]">
          <div className="max-w-10/11 mx-auto">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
