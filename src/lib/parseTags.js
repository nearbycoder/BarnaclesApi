import dotenv from 'dotenv';

dotenv.config();

export default function parseTags($) {
  const tags = [];

  $('.tag').each((index, element) => {
    const name = $(element).text();
    tags.push({
      name: name,
      url: `${process.env.API_URL}/filter/${name}`
    });
  });

  return tags;
}
