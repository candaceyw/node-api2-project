import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postAction';
import BlogPost from './BlogPost';

const Blog = ({getPosts, posts, loading, }) => {
    console.log("blog posts", posts)
    useEffect(() => {
        getPosts();
        //eslint-disable-next-line
      }, []);

      if (loading || posts === null) {
        return "Loading...";
      }

    return (
        <div>         
         <h1 className='center'>Blog Posts</h1>
        <div>

        {!loading && posts.length === 0 ? (
          <p className='center'>No Posts available... </p>
        ) : (
          posts.map(post => <BlogPost title={post.title} contents={post.contents} id={post.id} created={post.created_at} updated={post.updated_at} key={post.id} />)
        )}
            </div> 
            
        </div>
    )
}
const mapStateToProps = state => {
    return {
        posts: state.posts,
        error: state.error
    };
      };

export default connect (mapStateToProps, {getPosts})(Blog)
