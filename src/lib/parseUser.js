export default function parseUser($, name) {
  const user = { name: name };

  user['img'] = $('#gravatar img').attr('src');
  $('.box .d').each((index, element) => {
    const label = $(element).prev().text();

    user[label] = $(element).text().replace(/\s+/g, ' ').trim();
  });

  return user;
}
