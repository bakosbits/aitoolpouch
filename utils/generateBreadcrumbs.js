export default function generateBreadcrumbs(asPath) {
  const segments = asPath.split('/').filter(Boolean);

  let path = '';
  const crumbs = segments.map((seg, i) => {
    path += `/${seg}`;
    const label = decodeURIComponent(seg.replace(/-/g, ' '));

    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      href: i < segments.length - 1 ? path : null, // only link if not last
    };
  });

  // Add Home link to start
  return [{ label: 'Home', href: '/' }, ...crumbs];
}
