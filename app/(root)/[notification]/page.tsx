import Scrool from "@/components/Scrool";
import { fetchSingleNotification } from "@/lib/helpers/notification";

export default async function Home({ params }: { params: { notification: string } }) {
  let notification = await fetchSingleNotification(params.notification);
  return (
    <Scrool>
      <h1 className="capitalize font-semibold text-xl mt-5">{notification && notification.title}</h1>
      <h3 className="text-sm my-3 text-stone-400">{notification && notification.date} </h3>
      <p>{notification && notification.text} </p>
    </Scrool>
  );
}
