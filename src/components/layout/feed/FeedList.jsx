import { useChannel, useInfiniteFeed } from '@/hooks';
import { getDate, getPbImageURL, handleKeyboardArrowControl } from '@/utils';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import { ReactComponent as Comment } from '@/assets/comment_Feed.svg';

function FeedList() {
  const navigate = useNavigate();
  const { isLoading, data, hasNextPage } = useInfiniteFeed();
  const { channelList } = useChannel();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-280px)] pt-10">
        <Spinner size={'50%'} />
        <p role="status" className="text-center text-lionly-md text-lionly-red">
          게시글을 불러오는 중입니다.
        </p>
      </div>
    );
  }

  return (
    data && (
      <main className="min-h-[calc(100vh-280px)]">
        <ul
          id={`tabpanel-${Object.values(channelList).indexOf(true) + 1}`}
          role="tabpanel"
          aria-labelledby={`tab-${
            Object.values(channelList).indexOf(true) + 1
          }`}
          className="mx-auto flex flex-col gap-y-6 px-2"
        >
          <h4 className="sr-only">피드 리스트</h4>
          {data.pages.map((feed, index) => (
            <Fragment key={index}>
              {feed.totalPages !== 0 ? (
                feed.items.map((item) => (
                  <li
                    tabIndex={0}
                    key={item.id}
                    id={item.id}
                    onKeyDown={handleKeyboardArrowControl}
                    onClick={() => {
                      navigate(`/feed/contents/${item.id}`);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="flex flex-col gap-y-2.5">
                      <figure className="flex h-10 w-full gap-x-3">
                        <img
                          alt={`${item.expand.author.nickname}의 프로필 이미지`}
                          src={getPbImageURL(
                            item.expand.author,
                            'profile_image'
                          )}
                          className="h-10 min-h-[40px] w-10 min-w-[40px] rounded-full border-2"
                        />

                        <figcaption className="flex gap-x-3">
                          <div className="flex flex-col">
                            <p className="font-bold text-lionly-black">
                              {item.expand.author.nickname}
                            </p>
                            <p className="text-lionly-sm text-lionly-gray-1">
                              {`${getDate(item.created)}`}
                            </p>
                          </div>
                          <div className="flex items-center gap-x-1 pt-6 ">
                            <Comment
                              aria-hidden
                              className="w-3 fill-lionly-gray-1"
                            />
                            <span
                              aria-label="댓글 수"
                              className="text-lionly-sm-bold text-lionly-black"
                            >
                              {item.comments.length}
                            </span>
                          </div>
                        </figcaption>
                      </figure>

                      <figure className="flex w-full flex-col gap-y-[14px]">
                        <img
                          alt={`${item.expand.author.nickname}의 피드 이미지`}
                          src={getPbImageURL(item, 'feed_image')}
                          className="aspect-[4/3] w-full self-center rounded-2xl object-cover"
                        />

                        <figcaption>
                          <p className="w-full text-lionly-md text-lionly-gray-1">
                            {item.text}
                          </p>
                        </figcaption>
                      </figure>
                    </div>
                  </li>
                ))
              ) : (
                <div className="pt-[30%] text-center">
                  <p className="text-lionly-xl text-lionly-red">
                    게시글이 없습니다.
                  </p>
                  <p className="text-lionly-2xl text-lionly-black">
                    게시글을 등록해보세요!
                  </p>
                </div>
              )}
            </Fragment>
          ))}
          {!hasNextPage && data.pages[0].totalPages !== 0 ? (
            <p
              role="status"
              className="pt-6 text-center text-lionly-base text-lionly-red"
            >
              마지막 게시글입니다.
            </p>
          ) : null}
        </ul>
      </main>
    )
  );
}

export default FeedList;
