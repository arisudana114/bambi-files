import React from "react";
import Link from "next/link";

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-5 sm:py-7 bg-[#193f88]">
      <div className="container max-w-screen-xl mx-auto px-4 ">
        <ol className="inline-flex flex-wrap text-white space-x-1 md:space-x-3 items-center">
          {breadCrumbs?.map((breadCrumb, index) => (
            <li className="inline-flex items-center">
              <Link
                href={breadCrumb.url}
                className="text-white hover:text-gray-200"
              >
                {breadCrumb.name}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <i className="ml-3 text-white fa fa-chevron-right"></i>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
