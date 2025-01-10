import axios from "axios";
import { JSDOM } from "jsdom";

const scrape = async (SAMPLE_URL: string) => {
  try {

    console.log(`Scraping URL: ${SAMPLE_URL}`);
    const { data: html } = await axios.get(SAMPLE_URL);

    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Find the accordion container -- It the parent for all the AccordionItems
    const accordionDiv = document.querySelector('div[data-component="Accordion"]');

    if (!accordionDiv) {
      console.log("Accordion component not found on the page.");
      return;
    }

    const accordionItems = accordionDiv.querySelectorAll('div[data-component="AccordionItem"]');

    if (accordionItems.length > 7) {
      const element = accordionItems[7];
      const urlLink = element.querySelector('a')?.getAttribute('href');
      if (urlLink) {
        console.log("Found URL:", urlLink);
      } else {
        console.log("No URL found in the 8th AccordionItem.");
      }
    } else {
      console.log(`Expected at least 8 AccordionItems, but found ${accordionItems.length}.`);
    }
  } catch (error: any) {
    console.error("An error occurred while scraping the data:", error.message);
  }
};

// Sample URL to scrape
const sample = "https://partners.no/eiendom/3183775?boligvisning=sunmap";

// Run the scraper
scrape(sample);
