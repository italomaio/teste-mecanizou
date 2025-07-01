import React from "react";
import { cn } from "@/utils/classes";

import Link from "next/link";

const ProductLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { productId?: string }
>(({ children, productId, className, ...props }, ref) => (
  <Link
    aria-label={productId ? `View product ${productId}` : "Go to reviews"}
    aria-current={productId ? undefined : "page"}
    ref={ref}
    href={productId ? `/products/${productId}` : "#reviews"}
    className={cn("focus-visible-ring flex flex-col", className)}
    {...props}
  >
    {children}
  </Link>
));

ProductLink.displayName = "ProductLink";

export default ProductLink;
