import axios from "axios";
import Logo from "../assets/images/logo.png";
import {
  GetEventTickets3Input,
  GetEventsInput,
  GetHighInventoryPerformersInput,
  GetHighSalesPerformersInput,
  GetPerformerByCategoryInput,
  SearchEventsInput,
  SearchPerformersInput,
} from "@/types/input-calls-types";

export const baseApi = "https://ticketjewel.com";

export const SHEET_ID = "1Ojnkc4IaJcXjuh-A20xCsc8pR8pMFIJfS7rFP_DoMlQ"; // Sheet ID
export const SHEET_NAME = "Sheet1"; // Sheet Name
export const googleSheetRange = "A:C"; // The range of cells
export const WBCID = 27239;
export const SOAP_ACTION =
  "http://tnwebservices.ticketnetwork.com/TNWebservice/v3.2/TNWebservice.asmx";

export const siteSettings = {
  site_name: "Ticketjewel",
  logo: {
    src: Logo,
    alt: "Ticketjewel logo",
    height: 50,
  },
  hero_text: {
    title: "Meet your favorite",
    p: "Artists, sport teams and parties",
  },
  social_media_links: {
    facebook: "https://www.facebook.com/TicketFront1/",
    twitter: "https://twitter.com/TicketFront1",
    pinterest: "https://www.pinterest.com/TicketFront/",
    youtube: "https://www.youtube.com/channel/UCx764oTSrS3xqOhYk7vpehQ",
    instagram: "https://www.instagram.com/ticketfront/",
  },
  phone_number: "+18444256941",
  main_categories: [
    {
      title: "Concerts",
      link: "/concerts-tickets",
      id: 2,
      sub_category: [
        {
          title: "Festivals",
          performers: [
            {
              title: "Lollapalooza",
            },
            {
              title: "Bottlerock Festival",
            },
            {
              title: "Austin City Limits",
            },
            {
              title: "CMA Music Festival",
            },
            {
              title: "EDC Las Vegas",
            },
            {
              title: "Bonnaroo",
            },
            {
              title: "California Roots Festival",
            },
            {
              title: "Summer Camp Music Festival",
            },
            {
              title: "Ultra Music Festival",
            },
            {
              title: "View All Festivals",
            },
          ],
        },
        {
          title: "Country",
          performers: [
            {
              title: "Carrie Underwood",
            },
            {
              title: "Dan + Shay",
            },
            {
              title: "Luke Combs",
            },
            {
              title: "Luke Bryan",
            },
            {
              title: "Kane Brown",
            },
            {
              title: "Chris Young",
            },
            {
              title: "Zac Brown Band",
            },
            {
              title: "Blake Shelton",
            },
            {
              title: "Florida Georgia Line",
            },
            {
              title: "Thomas Rhett",
            },
            {
              title: "View All Country",
            },
          ],
        },
        {
          title: "Pop",
          performers: [
            {
              title: "Alanis Morissette",
            },
            {
              title: "Billie Eilish",
            },
            {
              title: "Matchbox Twenty",
            },
            {
              title: "Justin Bieber",
            },
            {
              title: "Taylor Swift",
            },
            {
              title: "Billy Joel",
            },
            {
              title: "Celine Dion",
            },
            {
              title: "Maroon 5",
            },
            {
              title: "The Weeknd",
            },
            {
              title: "View All Pop",
            },
          ],
        },
        {
          title: "Rock",
          performers: [
            {
              title: "The Rolling Stones",
            },
            {
              title: "Metallica",
            },
            {
              title: "Aerosmith",
            },
            {
              title: "KISS",
            },
            {
              title: "Def Leppard",
            },
            {
              title: "August Burns Red",
            },
            {
              title: "Pearl Jam",
            },
            {
              title: "Megadeth",
            },
            {
              title: "Santana",
            },
            {
              title: "View All Rock",
            },
          ],
        },
        {
          title: "Hip Hop",
          performers: [
            {
              title: "Freddie Gibbs",
            },
            {
              title: "Action Bronson",
            },
            {
              title: "Run The Jewels",
            },
            {
              title: "Watsky",
            },
            {
              title: "Russ",
            },
            {
              title: "Post Malone",
            },
            {
              title: "Dave East",
            },
            {
              title: "Jack Harlow",
            },
            {
              title: "Stormzy",
            },
            {
              title: "Lil Mosey",
            },
            {
              title: "View All Hip Hop",
            },
          ],
        },
        {
          title: "Comedy",
          performers: [
            {
              title: "Deon Cole",
            },
            {
              title: "Martin Lawrence",
            },
            {
              title: "Michael Blackson",
            },
            {
              title: "Bert Kreischer",
            },
            {
              title: "DeRay Davis",
            },
            {
              title: "Jerry Seinfeld",
            },
            {
              title: "Jay Pharoah",
            },
            {
              title: "Jeff Dunham",
            },
            {
              title: "Sebastian Maniscalco",
            },
            {
              title: "Jo Koy",
            },
            {
              title: "View All Comedy",
            },
          ],
        },
      ],
    },
    {
      title: "Sports",
      link: "/sports-tickets",
      id: 1,
      sub_category: [
        {
          title: "NFL",
          performers: [
            { title: "Arizona Cardinals" },
            { title: "Atlanta Falcons" },
            { title: "Baltimore Ravens" },
            { title: "Buffalo Bills" },
            { title: "Carolina Panthers" },
            { title: "Chicago Bears" },
            { title: "Cincinnati Bengals" },
            { title: "Cleveland Browns" },
            { title: "Dallas Cowboys" },
            { title: "Denver Broncos" },
            { title: "Detroit Lions" },
            { title: "Green Bay Packers" },
            { title: "Houston Texans" },
            { title: "Indianapolis Colts" },
            { title: "Jacksonville Jaguars" },
            { title: "Kansas City Chiefs" },
            { title: "Las Vegas Raiders" },
            { title: "Los Angeles Chargers" },
            { title: "Los Angeles Rams" },
            { title: "Miami Dolphins" },
            { title: "Minnesota Vikings" },
            { title: "New England Patriots" },
            { title: "New Orleans Saints" },
            { title: "New York Giants" },
            { title: "New York Jets" },
            { title: "Philadelphia Eagles" },
            { title: "Pittsburgh Steelers" },
            { title: "San Francisco 49ers" },
            { title: "Seattle Seahawks" },
            { title: "Tampa Bay Buccaneers" },
            { title: "Tennessee Titans" },
            { title: "Washington Commanders" },
            { title: "View All NFL" },
          ],
        },
        {
          title: "NBA",
          performers: [
            { title: "Atlanta Hawks" },
            { title: "Boston Celtics" },
            { title: "Brooklyn Nets" },
            { title: "Charlotte Hornets" },
            { title: "Chicago Bulls" },
            { title: "Cleveland Cavaliers" },
            { title: "Dallas Mavericks" },
            { title: "Denver Nuggets" },
            { title: "Detroit Pistons" },
            { title: "Golden State Warriors" },
            { title: "Houston Rockets" },
            { title: "Indiana Pacers" },
            { title: "Los Angeles Clippers" },
            { title: "Los Angeles Lakers" },
            { title: "Memphis Grizzlies" },
            { title: "Miami Heat" },
            { title: "Milwaukee Bucks" },
            { title: "Minnesota Timberwolves" },
            { title: "New Orleans Pelicans" },
            { title: "New York Knicks" },
            { title: "Oklahoma City Thunder" },
            { title: "Orlando Magic" },
            { title: "Philadelphia 76ers" },
            { title: "Phoenix Suns" },
            { title: "Portland Trail Blazers" },
            { title: "Sacramento Kings" },
            { title: "San Antonio Spurs" },
            { title: "Toronto Raptors" },
            { title: "Utah Jazz" },
            { title: "Washington Wizards" },
            { title: "View All NBA" },
          ],
        },
        {
          title: "MLB",
          performers: [
            { title: "Arizona Diamondbacks" },
            { title: "Atlanta Braves" },
            { title: "Baltimore Orioles" },
            { title: "Boston Red Sox" },
            { title: "Chicago Cubs" },
            { title: "Chicago White Sox" },
            { title: "Cincinnati Reds" },
            { title: "Cleveland Guardians" },
            { title: "Colorado Rockies" },
            { title: "Detroit Tigers" },
            { title: "Houston Astros" },
            { title: "Kansas City Royals" },
            { title: "Los Angeles Angels" },
            { title: "Los Angeles Dodgers" },
            { title: "Miami Marlins" },
            { title: "Milwaukee Brewers" },
            { title: "Minnesota Twins" },
            { title: "New York Mets" },
            { title: "New York Yankees" },
            { title: "Oakland Athletics" },
            { title: "Philadelphia Phillies" },
            { title: "Pittsburgh Pirates" },
            { title: "San Diego Padres" },
            { title: "San Francisco Giants" },
            { title: "Seattle Mariners" },
            { title: "St. Louis Cardinals" },
            { title: "Tampa Bay Rays" },
            { title: "Texas Rangers" },
            { title: "Toronto Blue Jays" },
            { title: "Washington Nationals" },
            { title: "View All MLB" },
          ],
        },
        {
          title: "NHL",
          performers: [
            { title: "Anaheim Ducks" },
            { title: "Arizona Coyotes" },
            { title: "Boston Bruins" },
            { title: "Buffalo Sabres" },
            { title: "Calgary Flames" },
            { title: "Carolina Hurricanes" },
            { title: "Chicago Blackhawks" },
            { title: "Colorado Avalanche" },
            { title: "Columbus Blue Jackets" },
            { title: "Dallas Stars" },
            { title: "Detroit Red Wings" },
            { title: "Edmonton Oilers" },
            { title: "Florida Panthers" },
            { title: "Los Angeles Kings" },
            { title: "Minnesota Wild" },
            { title: "Montreal Canadiens" },
            { title: "Nashville Predators" },
            { title: "New Jersey Devils" },
            { title: "New York Islanders" },
            { title: "New York Rangers" },
            { title: "Ottawa Senators" },
            { title: "Philadelphia Flyers" },
            { title: "Pittsburgh Penguins" },
            { title: "San Jose Sharks" },
            { title: "Seattle Kraken" },
            { title: "St. Louis Blues" },
            { title: "Tampa Bay Lightning" },
            { title: "Toronto Maple Leafs" },
            { title: "Vancouver Canucks" },
            { title: "Washington Capitals" },
            { title: "Winnipeg Jets" },
            { title: "Vegas Golden Knights" },
            { title: "View All NHL" },
          ],
        },
        {
          title: "MLS",
          performers: [
            { title: "Atlanta United FC" },
            { title: "Chicago Fire" },
            { title: "FC Cincinnati" },
            { title: "Colorado Rapids" },
            { title: "Columbus Crew SC" },
            { title: "D.C. United" },
            { title: "FC Dallas" },
            { title: "Houston Dynamo" },
            { title: "Inter Miami CF" },
            { title: "LAFC" },
            { title: "LA Galaxy" },
            { title: "Minnesota United FC" },
            { title: "Montreal Impact" },
            { title: "Nashville SC" },
            { title: "New England Revolution" },
            { title: "New York City FC" },
            { title: "New York Red Bulls" },
            { title: "Orlando City SC" },
            { title: "Philadelphia Union" },
            { title: "Portland Timbers" },
            { title: "Real Salt Lake" },
            { title: "San Jose Earthquakes" },
            { title: "Seattle Sounders FC" },
            { title: "Sporting Kansas City" },
            { title: "Toronto FC" },
            { title: "Vancouver Whitecaps FC" },
            { title: "View All MLS" },
          ],
        },
      ],
    },
    {
      title: "Theatre",
      link: "theatre-tickets",
      id: 2,
      sub_category: [
        {
          title: "Broadway",
          performers: [
            {
              title: "Hamilton",
            },
            {
              title: "Wicked",
            },
            {
              title: "The Phantom Of The Opera",
            },
            {
              title: "The Book Of Mormon",
            },
            {
              title: "Dear Evan Hansen",
            },
            {
              title: "Chicago - The Musical",
            },
            {
              title: "Mrs Doubtfire",
            },
            {
              title: "Jagged Little Pill",
            },
            {
              title: "Jersey Boys",
            },
            {
              title: "Aladdin",
            },
            {
              title: "View All Broadway",
            },
          ],
        },
        {
          title: "Family",
          performers: [
            {
              title: "Baby Shark Live",
            },
            {
              title: "Paw Patrol",
            },
            {
              title: "Trolls Live",
            },
            {
              title: "JoJo Siwa",
            },
            {
              title: "Disney on Ice",
            },
            {
              title: "Frozen - The Musical",
            },
            {
              title: "Mini Pops Kids",
            },
            {
              title: "Family",
            },
          ],
        },
        {
          title: "On Tour",
          performers: [
            {
              title: "Hamilton",
            },
            {
              title: "The Band's Visit",
            },
            {
              title: "Frozen",
            },
            {
              title: "Hadestown",
            },
            {
              title: "The Illusionists",
            },
            {
              title: "Jersey Boys",
            },
            {
              title: "Jesus Christ Superstar",
            },
            {
              title: "My Fair Lady",
            },
            {
              title: "Moulin Rouge",
            },
            {
              title: "What The Constitution Means To Me",
            },
            {
              title: "View All Broadway-Tour",
            },
          ],
        },
        {
          title: "Musicals",
          performers: [
            {
              title: "Waitress",
            },
            {
              title: "The Addams Family",
            },
            {
              title: "Saturday Night Fever",
            },
            {
              title: "Shrek The Musical",
            },
            {
              title: "A Bronx Tale",
            },
            {
              title: "To Kill a Mockingbird",
            },
            {
              title: "The Book of Mormon",
            },
            {
              title: "Harry Potter and the Cursed Child",
            },
            {
              title: "View All Musicals",
            },
          ],
        },
      ],
    },
  ],
};

export const fetchHighSalesPerformers = async (
  params: GetHighSalesPerformersInput
) => {
  try {
    const response = await axios.post("/api/GetHighSalesPerformers", params);
    const data = response.data.GetHighSalesPerformersResult.PerformerPercent;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchHighInventoryPerformers = async (
  params: GetHighInventoryPerformersInput,
) => {
  try {
    const response = await axios.post(
      "/api/GetHighInventoryPerformers",
      params,
      {
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = progressEvent.total
            ? Math.floor((progressEvent.loaded / progressEvent.total) * 100)
            : null;
          console.log(percentCompleted);
        },
      }
    );
    const data =
      response.data.GetHighInventoryPerformersResult.PerformerPercent;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchPerformerByCategory = async (
  params: GetPerformerByCategoryInput
) => {
  try {
    const response = await axios.post("/api/GetPerformerByCategory", params);
    const data = response.data.GetPerformerByCategoryResult.Performer;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchSearchEvents = async (params: SearchEventsInput) => {
  try {
    const response = await axios.post("/api/SearchEvents", params);
    const data = response.data.SearchEventsResult?.Event;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchSearchPerformers = async (params: SearchPerformersInput) => {
  try {
    const response = await axios.post("/api/SearchPerformers", params);
    const data = response.data.SearchPerformersResult.Performer;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchGetEvents = async (
  params: GetEventsInput,
) => {
  try {
    const response = await axios.post("/api/GetEvents", params, {
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = progressEvent.total
          ? Math.floor((progressEvent.loaded / progressEvent.total) * 100)
          : null;
        console.log(progressEvent, percentCompleted);
      },
    });
    const data = response.data.GetEventsResult?.Event;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const fetchGetEventTickets3 = async (params: GetEventTickets3Input) => {
  try {
    const response = await axios.post("/api/GetEventTickets3", params);
    const data = response.data.GetEventTickets3Result.Tickets.TicketGroup3;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
};
