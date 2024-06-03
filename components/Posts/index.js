/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidth } from '../hooks/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [start, setStart] = useState(0);

  const { isSmallerDevice } = useWindowWidth();
  const limit = isSmallerDevice ? 5 : 10;

  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchPost = useCallback(async () => {
    const response = await axios.get('/api/v1/posts', {
      params: { start: start, limit: limit },
    });
    let newPosts = response.data.posts;

    if (start + limit >= response.data.totalcount) setHasMorePosts(false);

    setStart(start === 0 ? (start + 1) * limit : start + limit);
    setPosts(prev => {
      return [...prev, ...newPosts];
    });
    setIsLoading(false);
  }, [start, limit]);
  useEffect(() => {
    console.log('effect');
    fetchPost();
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    await fetchPost();
  };
  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {hasMorePosts && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
