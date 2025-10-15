export default function ReclameAquiSeal() {
  const sealHTML = `
    <div id="ra-verified-seal"></div>
    <script type="text/javascript" id="ra-embed-verified-seal" src="https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js" data-id="c1R2WXBhVGpfMGJUeDJZMjpjaWVuY2lhLWRhLXJpcXVlemEtY3Vyc29z" data-target="ra-verified-seal" data-model="1"></script>
  `

  return (
    <div className="flex flex-col items-center">
      <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-yellow-400">
        Reputação
      </h4>
      <div 
        className="flex justify-center items-center min-h-[80px] w-full"
        style={{ 
          filter: 'brightness(0.9) contrast(1.1)', 
          transform: 'scale(0.9)' 
        }}
        dangerouslySetInnerHTML={{ __html: sealHTML }}
      />
    </div>
  )
}