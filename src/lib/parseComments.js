import dotenv from 'dotenv';

dotenv.config();

export default function parseComments($) {
  const comments = [];

  $('div.comment').each((index, element) => {
    const details = $(element).find('.details');
    const author = details.find('.byline a:nth-child(4)').text();

    if (author) {
      comments.push({
        author: author,
        authorProfile: `${process.env.API_URL}${details
          .find('.byline a:nth-child(3)')
          .attr('href')}`,
        time: details.find('.byline span').text().replace(/\s+/g, ' ').trim(),
        text: details.find('.comment_text').text().replace(/\s+/g, ' ').trim(),
        score: $(element).find('.score').text()
      });
    }
  });

  return comments;
}
