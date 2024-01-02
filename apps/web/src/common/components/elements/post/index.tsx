// "use client";
// import { Info, MoreHorizontal } from "lucide-react";
// import PostImage from "./PostImages";

// import UserAvatar from "../UserAvatar";
// import { Post } from "@/common/typings/post";

// type PostProps = {
//   post: Post;
// };

// export default function Post({  post}: PostProps) {

//   return (
//     <article className="flex h-fit flex-col gap-4  border p-4">
//       <header className="flex w-full items-center justify-between">
//         <div className="flex items-center gap-2">
//          {/* <UserAvatar src={post.user.image} name={post.user.name}/> */}

//           <div className="leading-5">
//             <h1>{user.name}</h1>
//             <small className="text-muted-foreground">@{user.name}</small>
//           </div>
//         </div>
//         <i className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-primary-foreground">
//           <MoreHorizontal />
//         </i>
//       </header>
//       <main className="space-y-2">
//         <p className="text-lg text-primary">{post.status}</p>
//         {images ? <PostImage images={images} /> : null}
//       </main>

//     </article>
//   );
// }
