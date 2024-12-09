import { assets } from "../assets/assets";

export const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* -------left side -------- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full text-gray-600 leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus,
            molestias sint? Neque distinctio necessitatibus cumque, fugiat culpa
            animi inventore ea dolorem aperiam rem veniam, quaerat reiciendis
            consectetur commodi voluptatum placeat!
          </p>
        </div>

        {/* -------center side -------- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* -------Right side -------- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 99005 77886</li>
            <li>aryanTech@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ Greatstack.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};
