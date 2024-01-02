import Image from 'next/image';

type Props = {
    images: {
        id?: number;
        url: string;
        postId?: number;
    }[];
};

export default function PostImage({ images }: Props) {
    return (
        <figure className="flex flex-wrap justify-center gap-1">
            {images.length === 1
                ? images.map((img) => (
                      <Image
                          key={img.id}
                          src={img.url}
                          alt="image"
                          className="max-w-[35.375rem] overflow-hidden rounded-lg object-cover"
                          quality={100}
                          width={566}
                          height={566}
                          loading="lazy"
                      />
                  ))
                : images.length === 2
                  ? images.map((img) => (
                        <Image
                            key={img.id}
                            src={img.url}
                            alt="image"
                            className="max-w-[calc(100%/2-4px)] rounded-lg object-cover"
                            quality={100}
                            width={283}
                            height={283}
                            loading="lazy"
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
                                      className="max-w-[35.375rem] rounded-lg object-cover"
                                      quality={100}
                                      width={566}
                                      height={566}
                                      loading="lazy"
                                  />
                              );
                          }
                          return (
                              <Image
                                  key={img.id}
                                  src={img.url}
                                  alt="image"
                                  className="max-w-[calc(100%/2-4px)] rounded-lg object-cover"
                                  quality={100}
                                  width={283}
                                  height={283}
                                  loading="lazy"
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
                                      className="rounded-lg object-cover"
                                      quality={100}
                                      width={566}
                                      height={566}
                                      loading="lazy"
                                  />
                              );
                          }
                          return (
                              <Image
                                  key={img.id}
                                  src={img.url}
                                  alt="image"
                                  className="max-w-[calc(100%/3-4px)] rounded-lg object-cover"
                                  sizes="(max-width: calc(100%/3)) 100vw, calc(100%/3)"
                                  quality={100}
                                  width={188}
                                  height={188}
                                  loading="lazy"
                              />
                          );
                      })}
        </figure>
    );
}
