import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import BookService from '../../Services/BookService';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 10; // Define page size constant

const fetchDataFromApi = async ({ pageParam }) => {
    const { data } = await BookService.getAll({
        PageNumber: pageParam,
        PageSize: PAGE_SIZE
    });
    return data;
};

const InfiniteScrollList = () => {
    const { data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['infiniteData'],
        queryFn: fetchDataFromApi,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.data || lastPage.data.length < PAGE_SIZE) {
                return undefined;
            }
            return allPages.length + 1;
        }
    });

    const items = data?.pages.flatMap(page => page.data) ?? [];
    const isEmpty = items.length === 0;
    const isReachingEnd = isEmpty || (data && data.pages[data.pages.length - 1]?.data.length < PAGE_SIZE);

    return (
        <div className="container mx-auto p-4">
            <InfiniteScroll
                dataLength={items.length}
                next={fetchNextPage}
                hasMore={!isReachingEnd}
                endMessage={
                    <div className="text-center p-4 text-gray-500">
                        <p className="text-xl">✨ You have seen all items ✨</p>
                        <p className="text-lg">Total items: {items.length}</p>
                    </div>
                }
            >
                {items.map((item) => (
                    <div key={item.bookId} className="mb-5">
                        <h1 className="text-3xl">{item.bookId} - {item.title}</h1>
                        <h3 className="text-xl text-gray-600">{item.author}</h3>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default InfiniteScrollList;