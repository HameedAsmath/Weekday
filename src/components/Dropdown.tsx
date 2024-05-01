import { useEffect, useState } from "react";
import DropdownIcon from "../icons/DropdownIcon";

const DropdownSelect = ({ options }: { options: string[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    console.log(selectedOption);
  }, [selectedOption]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setSearchTerm(option);
    setIsDropdownOpen(false);
  };

  const filteredOptions = options.filter((option: string) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className="border-2 flex items-center rounded-md pr-2 w-40"
        onClick={() => setIsDropdownOpen(!isDropDownOpen)}
      >
        <input
          type="search"
          className="w-full py-2 px-4 outline-none border-0"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>

        <div className="border-l border-gray-300 pl-2">
          <DropdownIcon />
        </div>
      </div>
      {filteredOptions.length > 0 && isDropDownOpen && (
        <div className="dropdown-menu text-gray-700 pt-1 border-2 border-gray-200 rounded-md w-40 absolute bg-white mt-1">
          {filteredOptions.map((option: string) => (
            <div className="top-10" key={option}>
              <p
                className="rounded-t bg-white hover:bg-blue-50 py-2 px-4 whitespace-no-wrap cursor-pointer w-full"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DropdownSelect;
