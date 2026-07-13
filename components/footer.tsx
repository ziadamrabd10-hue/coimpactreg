import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/images/coimpact.png"
              alt="CO-IMPACT Logo"
              width={150}
              height={50}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Consortium for Implementation of PSMA-PET
              <br />
              in Prostate Cancer therapy Trials
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              {[
                ['Home', '/'],
                ['Expert Network', '/expert-network'],
                ['Publications', '/publications'],
                ['Guidelines', '/guidelines'],
                ['Analysis Request', '/analysis-request'],
              ].map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm  text-gray-400  tracking-wider">
              <a 
                href="mailto:Mohamed.shelan@insel.ch, Constantinos.Zamboglou@goc.com.cy"
                className="hover:text-gray-900 dark:hover:text-white"
              >
                Contact us
              </a>
            </h3>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} CO-IMPACT Registry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

