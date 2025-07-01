import "@testing-library/jest-dom";

process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000/api";
process.env.API_URL = "http://localhost:3000/api";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("@/hooks", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
    style,
    onClick,
    role,
    "aria-label": ariaLabel,
    "aria-pressed": ariaPressed,
    ...rest
  }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        onClick={onClick}
        role={role}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
      />
    );
  },
}));
