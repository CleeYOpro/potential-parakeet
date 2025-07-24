import { useEffect } from "react";
import styled from "styled-components";

const BlogContainer = styled.div`
  min-height: 100vh;
  padding: 7rem 1rem 2rem 1rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 100;
`;

const BlogTitle = styled.h1`
  margin-top: 2.5rem;
  font-size: 3.8rem;
  color: var(--primary-color);
  font-family-mono: 'Rubik Mono One';
  text-align: center;
`;

const BlogDescription = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 600px;
`;

const BlogEmbedContainer = styled.div`
  width: 100%;
  max-width: 700px;
  z-index: 999;
  position: relative;
  color: #fff;
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background: rgba(0, 0, 0, 0.8);
  background: rgba(31, 30, 30, 0.85) !important;
  border-radius: 1.2rem !important;
  border: 1.5px solid rgba(255,255,255,0.13) !important;
  box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.10), 0 1.5px 8px 0 rgba(0,0,0,0.08) !important;
  backdrop-filter: blur(18px) saturate(1.5) !important;
  -webkit-backdrop-filter: blur(18px) saturate(1.5) !important;
  color: #fff !important;
  padding: 2rem !important;
`;


const Blog = () => {
  useEffect(() => {
    const oldScript = document.getElementById("retainable-rss-embed-script");
    if (oldScript) oldScript.remove();

    const oldEmbed = document.getElementById("retainable-rss-embed");
    if (oldEmbed) oldEmbed.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://www.twilik.com/assets/retainable/rss-embed/retainable-rss-embed.js";
    script.id = "retainable-rss-embed-script";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <BlogContainer>
      
      <BlogTitle>Blog</BlogTitle>
      <BlogDescription>
        Read my latest posts from <a href="https://medium.com/@cleobala" target="_blank" rel="noopener noreferrer" style={{color: "var(--primary-color)"}}>Medium</a> right here!
      </BlogDescription>
      <BlogEmbedContainer>
        <div
          id="retainable-rss-embed"
          data-rss="https://medium.com/feed/@cleobala"
          data-maxcols="1"
          data-layout="grid"
          data-poststyle="inline"
          data-readmore="Read the rest"
          data-buttonclass="btn btn-primary"
          data-offset="-100"
        ></div>
      </BlogEmbedContainer>
    </BlogContainer>
  );
};

export default Blog;
