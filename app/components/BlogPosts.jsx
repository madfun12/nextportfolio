import { getSortedPostsData } from "@/lib/posts";
import { BsArrowUpRightSquare } from "react-icons/bs";

const BlogPosts = () => {
    const allPosts = getSortedPostsData();

    const getLongDate = (date) => {
        let formattedDate = new Date(date);
        formattedDate = formattedDate.toDateString();
        return formattedDate;
    };
    return (
        <div className="flex flex-col gap-4">
            {allPosts.map((post) => (
                <a
                    key={post.id}
                    href={`/posts/${post.id}`}
                    className="dark:bg-neutral-900 border border-neutral-700 rounded-lg p-4 w-fit block relative sm:static"
                >
                    <h3 className="font-bold text-lg flex items-center gap-4 dark:text-neutral-200">
                        {post.title}
                        <BsArrowUpRightSquare className="absolute right-2 bottom-2 sm:static dark:text-neutral-200" />
                    </h3>

                    <p className="dark:text-neutral-200">
                        {getLongDate(post.date)}
                    </p>
                </a>
            ))}
        </div>
    );
};

export default BlogPosts;
