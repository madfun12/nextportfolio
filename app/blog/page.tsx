import MaxWrapper from "@/app/components/maxWrapper";
import SectionHeader from "../components/sectionHeader";
import BlogPosts from "@/app/components/BlogPosts";

const Blog = () => {
    return (
        <div>
            <MaxWrapper>
                <SectionHeader title="blog" />
                <BlogPosts />
            </MaxWrapper>
        </div>
    );
};

export default Blog;
