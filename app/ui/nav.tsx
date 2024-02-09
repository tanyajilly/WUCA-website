import Link from 'next/link';
import { getMainNav } from '@/app/lib/data';
import { NavigationItem } from '../lib/definitions';

export default async function Nav({locale}: {locale: string}) {
    const nav: NavigationItem[] = await getMainNav(locale);
    
    return (
    <ul
        className="
            pt-4
            text-base text-gray-700
            md:flex
            md:justify-between 
            md:pt-0 space-x-2"
    >
        {
            nav.map((el) => {
                const { id, title, path } = el;
                return(
                     <li key={id}>
                        <Link href={path} className="md:p-2 py-2 block hover:text-purple-400">
                            {title}
                        </Link>
                    </li>
                )
            })
        }
       
    </ul>
  );
};
