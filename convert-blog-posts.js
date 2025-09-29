const fs = require('fs');

// Function to convert Brazilian date format to ISO format
function convertDateToISO(brasilianDate) {
  const months = {
    'Janeiro': '01', 'Fevereiro': '02', 'Março': '03', 'Abril': '04',
    'Maio': '05', 'Junho': '06', 'Julho': '07', 'Agosto': '08',
    'Setembro': '09', 'Outubro': '10', 'Novembro': '11', 'Dezembro': '12'
  };

  // Parse "20 de Junho, 2025" format
  const parts = brasilianDate.split(' de ');
  const day = parts[0].padStart(2, '0');
  const monthAndYear = parts[1].split(', ');
  const monthName = monthAndYear[0];
  const year = monthAndYear[1];
  const month = months[monthName];

  return `${year}-${month}-${day}T10:00:00Z`;
}

// Function to strip HTML tags and get plain text
function htmlToPlainText(html) {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ')    // Replace multiple spaces with single space
    .trim();                 // Remove leading/trailing whitespace
}

// Function to calculate reading time (average 200 words per minute)
function calculateReadingTime(content) {
  const plainText = htmlToPlainText(content);
  const wordCount = plainText.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  return Math.max(1, readingTime); // Minimum 1 minute
}

// Read the blog data file
const blogDataPath = '/home/moitinho/ROBERTONAVARRO/lib/blog-data.ts';
const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');

// Extract the ptBlogPosts array content
const arrayStart = blogDataContent.indexOf('[');
const arrayEnd = blogDataContent.lastIndexOf('];');
const arrayContent = blogDataContent.substring(arrayStart, arrayEnd + 1);

// Parse the content (this is a simplified approach - we'll evaluate the JavaScript)
// Remove the 'export const ptBlogPosts = ' part and evaluate
const cleanArrayContent = arrayContent.replace(/`([^`]*)`/g, '"$1"'); // Convert template literals to strings for JSON parsing

// We need to manually extract each blog post since it contains template literals
// Let's use a different approach - find all blog post objects
const posts = [];
let currentIndex = 0;

// Find each blog post by looking for the pattern "id: number,"
const blogPostPattern = /\{\s*id:\s*(\d+),\s*title:\s*"([^"]*)",\s*excerpt:\s*"([^"]*)",\s*image:\s*"([^"]*)",\s*date:\s*"([^"]*)",\s*author:\s*"([^"]*)",\s*category:\s*"([^"]*)",\s*slug:\s*"([^"]*)",\s*content:\s*`([^`]*)`\s*\}/gs;

// Read the file again and process each match
let match;
while ((match = blogPostPattern.exec(blogDataContent)) !== null) {
  const [, id, title, excerpt, image, date, author, category, slug, content] = match;

  const baseHubPost = {
    _id: id,
    _title: title,
    slug: slug,
    excerpt: excerpt,
    content: {
      raw: htmlToPlainText(content),
      html: content
    },
    coverImage: {
      url: image,
      alt: title
    },
    publishedAt: convertDateToISO(date),
    author: author,
    category: category,
    readingTime: calculateReadingTime(content)
  };

  posts.push(baseHubPost);
}

console.log(`Found ${posts.length} blog posts`);

// Generate the new fallback data file content
const fallbackContent = `import type { BlogPost } from './client';

export const fallbackBlogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

// Write the new file
const outputPath = '/home/moitinho/ROBERTONAVARRO/converted-fallback-data.ts';
fs.writeFileSync(outputPath, fallbackContent);

console.log(`Conversion complete! New file created at: ${outputPath}`);
console.log(`Converted ${posts.length} blog posts to BaseHub format`);

// Show first few posts for verification
console.log('\nFirst 3 posts preview:');
posts.slice(0, 3).forEach((post, index) => {
  console.log(`${index + 1}. ${post._title} (${post.category}) - ${post.readingTime} min read`);
});