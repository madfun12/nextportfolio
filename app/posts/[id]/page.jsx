import MaxWrapper from "@/app/components/maxWrapper";
import { getPostData } from "@/lib/posts";
import { useParams } from "next/navigation";

const BlogPost = async (req) => {
    const params = req.params;
    const postData = await getPostData(params.id);
    const postDate = new Date(postData.date);
    const formattedDate = postDate.toDateString();
    return (
        <div className="p-4">
            <MaxWrapper>
                <h1 className="text-2xl font-bold mb-4 md:text-4xl lg:text-5xl">
                    {postData.title}
                </h1>
                <p className="text-neutral-400 mb-8 ">{formattedDate}</p>
                <div
                    className="blog-post"
                    dangerouslySetInnerHTML={{
                        __html: `${postData.contentHtml}`,
                    }}
                />
            </MaxWrapper>
        </div>
    );
};

export default BlogPost;
