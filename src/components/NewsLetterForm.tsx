import React from "react";

const NewsLetterForm: React.FC = () => {
  return (
    <section className="text-center py-5 mt-5">
      <h5 className="fw-semibold">Epic events and incredible deals straight to your inbox.</h5>
      <form>
        <div className="d-flex gap-2 justify-content-center pt-3">
          <input type="email" className="form-control rounded-pill w-auto" placeholder="Email" />
          <input type="submit" className="btn btn-outline-dark rounded-pill" value="Join the list" />
        </div>
        <p className="form-text">
          By signing up, you acknowledge and accept our privacy policy and consent to receiving emails.
        </p>
      </form>
    </section>
  );
};

export default NewsLetterForm;
