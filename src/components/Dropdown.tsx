import { useEffect, useState, useRef } from "react";
import DropdownIcon from "../icons/DropdownIcon";
import { useDebounce } from "../custom-hooks/useDebounce";

const DropdownSelect = ({
  options,
  placeholder,
  searchTerm,
  setSearchTerm,
  Nodata
}: {
  options: string[];
  placeholder: string;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  Nodata?: boolean
}) => {
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm||"", 300);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("option")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: string) => {
    setSearchTerm && setSearchTerm(option);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm && setSearchTerm(event.target.value);
    setIsDropdownOpen(true);
  };

  const filteredOptions = options.filter((option: string) =>
    option?.toLowerCase().includes(debouncedSearchTerm?.toLowerCase())
  );

  return (
    <>
      <div
        className="border-2 flex items-center rounded-md pr-2 w-44 relative"
        onClick={() => setIsDropdownOpen(!isDropDownOpen)}
      >
        <input
          type="search"
          className="w-full py-2 px-4 outline-none border-0"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
        ></input>

        <div className="border-l border-gray-300 pl-2">
          <DropdownIcon />
        </div>
      </div>
      {isDropDownOpen && (
        <div
          className="dropdown-menu text-gray-700 pt-1 border-2 border-gray-200 rounded-md w-44 absolute bg-white z-10 mt-1"
          ref={dropdownRef}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option: string) => (
              <div className="top-10" key={option}>
                <p
                  className={`rounded-t bg-white ${
                    !Nodata
                      ? "hover:bg-blue-50"
                      : "bg-gray-100  cursor-not-allowed"
                  } py-2 px-4 whitespace-no-wrap w-full option ${
                    !Nodata && "cursor-pointer"
                  }`}
                  onClick={() => !Nodata && handleOptionSelect(option)}
                >
                  {option}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 py-2 px-4">No Options</p>
          )}
        </div>
      )}
    </>
  );
};

export default DropdownSelect;
