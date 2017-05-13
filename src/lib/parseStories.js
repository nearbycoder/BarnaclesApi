import dotenv from 'dotenv';

dotenv.config();

export default function parseStories($) {
  const stories = [];

  $('.story_liner').each((index, element) => {
    const details = $(element).find('.details');
    const tags = [];
    $(element).find('.tags a').each((index, element) => {
      tags.push($(element).text());
    });

    stories.push({
      title: details.find('.link a').text(),
      score: $(element).find('.score').text(),
      url: details.find('.link a').attr('href'),
      tags: tags,
      domain: $(element).find('.domain').text(),
      author: $(element).find('.byline a:nth-child(2)').text(),
      authorProfile: `${process.env.API_URL}${$(element)
        .find('.byline a:nth-child(2)')
        .attr('href')}`,
      commments: $(element)
        .find('.comments_label a')
        .html()
        .replace(/\s+/g, ' ')
        .trim(),
      commentsUrl: `${process.env.API_URL}${$(element)
        .find('.comments_label a')
        .attr('href')}`
    });
  });

  return stories;
}
