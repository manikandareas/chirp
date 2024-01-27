'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

type Props = {
    images: {
        id?: number;
        url: string;
        postId?: number;
    }[];
};

export default function PostDetailImage({ images }: Props) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<number>(0);

    const slides = images.map((item) => ({
        src: item.url,
        width: 3840,
        height: 2560,
        srcSet: [
            { src: item.url, width: 320, height: 213 },
            { src: item.url, width: 640, height: 426 },
            { src: item.url, width: 1200, height: 800 },
            { src: item.url, width: 2048, height: 1365 },
            { src: item.url, width: 3840, height: 2560 },
        ],
    }));

    return (
        <figure className="flex flex-wrap justify-center gap-1">
            {images.length === 1
                ? images.map((img, idx) => (
                      <Image
                          key={img.id}
                          src={img.url}
                          alt="image"
                          className="max-w-[35.375rem] cursor-zoom-in overflow-hidden rounded-lg object-cover"
                          quality={100}
                          width={566}
                          height={566}
                          loading="lazy"
                          onClick={() => {
                              setOpen(true);
                              setImage(idx);
                          }}
                      />
                  ))
                : images.length === 2
                  ? images.map((img, idx) => (
                        <Image
                            key={img.id}
                            src={img.url}
                            alt="image"
                            className="max-w-[calc(100%/2-4px)] cursor-zoom-in rounded-lg object-cover"
                            quality={100}
                            width={283}
                            height={283}
                            loading="lazy"
                            onClick={() => {
                                setOpen(true);
                                setImage(idx);
                            }}
                        />
                    ))
                  : images.length === 3
                    ? images.map((img, idx) => {
                          if (idx === 0) {
                              return (
                                  <Image
                                      key={img.id}
                                      src={img.url}
                                      alt="image"
                                      className="max-w-[35.375rem] cursor-zoom-in rounded-lg object-cover"
                                      quality={100}
                                      width={566}
                                      height={566}
                                      loading="lazy"
                                      onClick={() => {
                                          setOpen(true);
                                          setImage(idx);
                                      }}
                                  />
                              );
                          }
                          return (
                              <Image
                                  key={img.id}
                                  src={img.url}
                                  alt="image"
                                  className="max-w-[calc(100%/2-4px)] cursor-zoom-in rounded-lg object-cover"
                                  quality={100}
                                  width={283}
                                  height={283}
                                  loading="lazy"
                                  onClick={() => {
                                      setOpen(true);
                                      setImage(idx);
                                  }}
                              />
                          );
                      })
                    : images.map((img, idx) => {
                          if (idx === 0) {
                              return (
                                  <Image
                                      key={img.id}
                                      src={img.url}
                                      alt="image"
                                      className="cursor-zoom-in rounded-lg object-cover"
                                      quality={100}
                                      width={566}
                                      height={566}
                                      loading="lazy"
                                      onClick={() => {
                                          setOpen(true);
                                          setImage(idx);
                                      }}
                                  />
                              );
                          }
                          return (
                              <Image
                                  key={img.id}
                                  src={img.url}
                                  alt="image"
                                  className="max-w-[calc(100%/3-4px)] cursor-zoom-in rounded-lg object-cover"
                                  sizes="(max-width: calc(100%/3)) 100vw, calc(100%/3)"
                                  quality={100}
                                  width={188}
                                  height={188}
                                  loading="lazy"
                                  onClick={() => {
                                      setOpen(true);
                                      setImage(idx);
                                  }}
                              />
                          );
                      })}
            <Lightbox
                open={open}
                index={image}
                close={() => setOpen(false)}
                plugins={[Zoom]}
                slides={slides}
            />
        </figure>
    );
}
