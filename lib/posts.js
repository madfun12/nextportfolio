import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
    try {
        // Get file names under /posts
        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = fileNames.map((fileName) => {
            // Remove ".md" from file name to get id
            const id = fileName.replace(/\.md$/, "");

            // Read markdown file as string
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            // Combine the data with the id
            return {
                id,
                ...matterResult.data,
            };
        });

        // Convert date string to date object for comparison
        allPostsData.forEach((post) => {
            const parts = post.date.split("-");

            post.date = new Date("20" + parts[2], parts[0] - 1, parts[1]);
        });

        // Sort posts by post date object
        allPostsData.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        });

        return allPostsData;
    } catch (error) {
        console.error(error);
    }
}

export async function getPostData(id) {
    try {
        const fullPath = path.join(postsDirectory, `${id}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Use remark to convert markdown into HTML string
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        const contentHtml = processedContent.toString();

        // Combine the data with the id and contentHtml
        return {
            id,
            contentHtml,
            ...matterResult.data,
        };
    } catch (error) {
        console.error(error);
    }
}
