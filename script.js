/* Greatest common devisor helper. */
function gcd(a, b) {
	return (b == 0) ? a : gcd (b, a%b);
}

/* Instantiating the app */
new Vue({
	el: '#app',
	data: {
		ratios: [
			{id: 0, w: 7680, h: 4320, comment: "(8k UHDTV)"},
			{id: 1,  w: 5120, h: 2880, comment: "(5k, iMac with retina screen)"},
			{id: 2,  w: 3840, h: 2160, comment: "(4k UHDTV)"},
			{id: 3,  w: 2048, h: 1536, comment: "(iPad with retina screen)"},
			{id: 4,  w: 1920, h: 1200, comment: "(Widescreen computer monitor)"},
			{id: 5,  w: 1920, h: 1080, comment: "(HD TV, iPhone 6 plus)"},
			{id: 6,  w: 1334, h: 750, comment: "(iPhone 6)"},
			{id: 7,  w: 1200, h: 630, comment: "(Facebook)"},
			{id: 8,  w: 1136, h: 640, comment: "(iPhone 5 Screen)"},
			{id: 9,  w: 1024, h: 768, comment: "(iPad)"},
			{id: 10,  w: 1024, h: 512, comment: "(Twitter)"},
			{id: 11,  w: 960, h: 640, comment: "(iPhone 4 screen)"},
			{id: 12,  w: 800, h: 600, comment: ""},
			{id: 13,  w: 728, h: 90, comment: "(Common web banner ad size)"},
			{id: 14,  w: 720, h: 486, comment: "(PAL)"},
			{id: 15,  w: 640, h: 480, comment: "(VGA)"},
			{id: 16,  w: 576, h: 486, comment: "(NTSC)"},
			{id: 17,  w: 320, h: 480, comment: "(HVGA)"},
		],
		h2Value: '',
		w2Value: '',
		selectedRatio: 12,
		currentWidth1: 800,
		currentHeight1:600,
		aspectRatio: '4:3',
		aspectRatioW: 4,
		aspectRatioH: 3,
		showSampleImgBool: false,
		imgSource: './sample.jpg',
		handleMismatches: '0',
	},
	methods: {
		resetFormInputs() {
			this.h2Value = ''
			this.w2Value = ''
		},
		calculateAspectRatio(r,w,h) {
			this.aspectRatioW = w/r;
			this.aspectRatioH = h/r;
			return w/r + ":" + h/r;
		},
		updateImageSize() {
			let self = this;
			setTimeout(function() {
				if(self.handleMismatches == '1') {
					let container = document.querySelector('.aspect-ratio-box');
					let	image = document.querySelector('.sample-image-mod');
					if(image.height < container.offsetHeight - 3) {
						image.classList.add('full-height-aspect');
						image.classList.remove('full-width-aspect');
					}
					if(image.width < container.offsetWidth - 3) {
						image.classList.add('full-width-aspect');	
						image.classList.remove('full-height-aspect');
					}
				}
			}, 1)
		}
	},
	watch: {
		selectedRatio() {
			this.currentWidth1 = this.ratios[this.selectedRatio].w;
			this.currentHeight1 = this.ratios[this.selectedRatio].h;
			this.updateImageSize();
		},
		currentWidth1() {
			let r = gcd(this.currentWidth1, this.currentHeight1)
			this.aspectRatio = this.calculateAspectRatio(r, this.currentWidth1, this.currentHeight1);
			if(this.w2Value == 0) this.w2Value = '';
			this.updateImageSize();
		},
		currentHeight1() {
			let r = gcd(this.currentWidth1, this.currentHeight1)
			this.aspectRatio = this.calculateAspectRatio(r, this.currentWidth1, this.currentHeight1);
			if(this.h2Value == 0) this.h2Value = '';
			this.updateImageSize();
		},
		handleMismatches() {
			this.updateImageSize();
		}
	},
	computed: {
		calculateW2: {
			get() {
				return parseFloat(this.w2Value).toFixed(0);
			},
			set(val) {
				this.w2Value = val
				this.h2Value = (this.currentHeight1 * this.w2Value) / this.currentWidth1;
			}
		},
		calculateH2: {
			get() {
				return parseFloat(this.h2Value).toFixed(0);
			},
			set(val) {
				this.h2Value = val
				this.w2Value = (this.currentWidth1 * this.h2Value) / this.currentHeight1;
			}
		},
		currentWidth: {
			get() {
				return parseFloat(this.currentWidth1).toFixed(0);
			},
			set(val) {
				this.currentWidth1 = val 
				this.w2Value = (this.currentWidth1 * this.h2Value) / this.currentHeight1;
			}
		},
		currentHeight: {
			get() {
				return parseFloat(this.currentHeight1).toFixed(0);
			},
			set(val) {
				this.currentHeight1 = val 
				this.h2Value = (this.currentHeight1 * this.w2Value) / this.currentWidth;
			}
		}
	}
})