import React from "react";

const Details: React.FC<{ performerTitle : string}> = ({ performerTitle }) => {
  return (
    <section className="bg-light p-4 rounded-3 border mt-5">
      <h2 className="text-capitalize">{performerTitle} Tickets</h2>
      <p>
        {`From Woodstock to the Boston Pops, from Coachella and Lollapalooza to the Grand Ole Opry and the Telluride
        Bluegrass Festival, there’s nothing quite like the live concert experience. Today's music scene is packed with
        artists who have revolutionized long-established genres, and nothing showcases the talent of these
        singer-songwriters/composers/musicians better than seeing them live. Year after year, artists create, record and
        release their work in the ever-evolving music scene, and they embark on concert tours to support their newest
        releases and share their music with fans around the world. No matter what genre you're a fan of — pop, rock,
        hip-hop, classical, blues, jazz, R&B, rap or world music — there are artists taking to stages all across the
        world tonight. Experience the world's best artists or up-and-coming musicians live; grab your concert tickets at
        StubHub.`}
      </p>
      <h6>The Live Concert Experience</h6>
      <p>
        {`This is quite possibly the best time to be a fan of music, as music has never been more available to fans, and
        artists are touring more than ever, playing live in cities all across the world. It's always an enjoyable
        experience to go out and see an artist perform live as a headliner, opening act or as part of a music festival
        lineup. There are thousands of artists touring at any given time, playing classic venues like The Fillmore in
        San Francisco, New York’s historic Madison Square Garden, the Red Rocks Amphitheater in Colorado, the Hollywood
        Bowl, The Kennedy Center in Washington, DC, and more. There's no end to the experiences one can have when
        heading out to a concert, and now couldn't be a better time for you to join in on the fun. With so many
        different kinds of artists and music genres, there's bound to be something for everyone to enjoy. Each live
        performance is a different and has its own surprises. StubHub can get you to the events you're excited — check
        out the artists touring in a city near you and buy tickets at StubHub.`}
      </p>
    </section>
  );
};

export default Details;
