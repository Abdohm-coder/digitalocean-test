import { siteSettings } from "@/settings/site.settings";
import React from "react";

const TicketInfo: React.FC<{ categoryTitle: string }> = ({ categoryTitle }) => {
  return (
    <section className="py-5">
      <h4 style={{ margin: "0" }} className="text-capitalize">
        {`${siteSettings.site_name}: Your Premier Destination for Premium ${categoryTitle} Tickets`}
      </h4>
      <p>
        {`
          As the global leader in premium ${categoryTitle} tickets, ${siteSettings.site_name} takes pride in providing a seamless and professional ticketing experience. Our extensive online inventory offers the best deals on ${categoryTitle} tickets at competitive prices. Whether you're seeking access to highly anticipated ${categoryTitle} events worldwide or sold-out performances, rest assured that ${siteSettings.site_name} will deliver reliable, efficient, and secure ticket transactions.
        `}
      </p>
      <ul>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`${categoryTitle} Ticketing Services`}</li>
        <p>
          {`
        ${siteSettings.site_name} ensures hassle-free and secure ${categoryTitle} ticketing transactions through our user-friendly online platform. Our comprehensive ${categoryTitle} ticket inventory features competitive prices for the most sought-after events. With our commitment to excellence, we aim to offer customers a satisfying and enjoyable shopping experience while selecting their preferred seating locations for their favorite ${categoryTitle} shows.
        `}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`Discover Unbelievable Bargains`}</li>
        <p>
          {`Exploring our ${categoryTitle} ticket inventory will reveal remarkable bargains that will astonish you. We provide detailed schedules and information about ${categoryTitle} events. Whether you desire general access or premium seating at ${categoryTitle}, ${siteSettings.site_name} is your ultimate solution for the best ticket deals. All transactions are processed securely on our server, and tickets will be conveniently delivered to you as downloadable e-tickets or through reliable postal services.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`Overview of ${categoryTitle} Tickets`}</li>
        <p>
          {`${siteSettings.site_name} stands as your premium source for the best deals on ${categoryTitle} tickets, offering top-notch online ticketing services. Equipped with cutting-edge Point-of-Sale software, ${siteSettings.site_name} provides efficient solutions for both ${categoryTitle} ticket buyers and sellers.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`A) Competitive Pricing`}</li>
        <p>
          {`Benefit from ${siteSettings.site_name}'s vast network of reliable brokers, fans, and season ticket suppliers, providing a unique platform for buying and selling ${categoryTitle} tickets. Our competitive pricing strategy ensures that our ${categoryTitle} tickets are 10% to 20% lower than other online vendors.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`B) Premium Seating Options`}</li>
        <p>
          {`At ${siteSettings.site_name}, we pride ourselves on offering premium seating options for your highly anticipated ${categoryTitle} events. Choose your desired seats at an affordable price, ensuring an exceptional viewing experience.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`C) Reliable Broker Network`}</li>
        <p>
          {`${siteSettings.site_name} maintains an extensive and trustworthy network of brokers. We diligently oversee and monitor our brokers to guarantee secure and satisfactory ${categoryTitle} ticket transactions.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`D) Real-Time Inventory`}</li>
        <p>
          {`Our real-time ${categoryTitle} ticket inventory sets us apart in the ticketing industry. All transactions for ${categoryTitle} tickets are conducted in real-time, eliminating any inconvenience or disappointment.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`E) Information Security`}</li>
        <p>
          {`Rest assured that all transactions for ${categoryTitle} tickets at ${siteSettings.site_name} are securely processed on our dedicated servers. We prioritize the safety and confidentiality of the information you provide during the ticket purchase process, and it will never be shared with any third parties.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`F) On-Time Delivery`}</li>
        <p>
          {`Your purchased ${categoryTitle} tickets will be delivered promptly to your designated address, ensuring a swift and punctual experience. We guarantee timely and reliable ticket delivery.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`G) Guaranteed Orders`}</li>
        <p>
          {`With our exclusive 100% guarantee, your ${categoryTitle} tickets are protected. In the event of a permanent cancellation or rescheduling of ${categoryTitle}, ${siteSettings.site_name} will provide a full refund of the ticket price, excluding shipping costs.`}
        </p>
        <li
          style={{ margin: "0", fontWeight: "500", listStyle: "none" }}
          className="text-capitalize">{`H) 100% Ticket Authenticity`}</li>
        <p>
          {`${siteSettings.site_name} takes pride in offering only genuine and legitimate ${categoryTitle} tickets. Unless otherwise stated in the ticket description, all tickets available through ${siteSettings.site_name} are authentic and valid for entry.`}
        </p>
      </ul>
    </section>
  );
};

export default TicketInfo;
