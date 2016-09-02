'use strict';

const gulp = require('gulp-help')(require('gulp'));
const server = require('gulp-develop-server');
const livereload = require('gulp-livereload');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const watch = require('gulp-watch');
const notify = require('gulp-notify');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const del = require('del');
const packageJson = require('./package.json');

// Disable log notifier
notify.logLevel(0);

const testFiles = [
	'test/**/*.js'
];

const serverFiles = [
	'./**/*.js',
	'!node_modules/**',
	'!test/**',
	'!coverage/**',
	'!target/**',
	'!gulpfile.js'
];

const eslintFiles = [
	'./**/*.js',
	'!node_modules/**',
	'!coverage/**',
	'!target/**',
	'!test/**',
	'!logs/**',
	'!config/**',
	'!common'
];

const pack = [
	'./**',
	'!coverage',
	'!coverage/**',
	'!target',
	'!target/**',
	'!gulp',
	'!gulp/**',
	'!gulpfile.js',
	'!node_modules/**/lcov.info',
	'!logs',
	'!logs/**'
];

function handleError(level, error) {
	gutil.log(gutil.colors.red(error.message));
}

function onError(error) {
	handleError.call(this, 'error', error);
}

gulp.task('start', 'Start Server', () => {
	server.listen({ path: 'app.js' }, livereload.listen);
});


gulp.task('watch', 'Watch files', () => {

	function restart(file) {
		gulp.src(file)
			.pipe(eslint())
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());

		server.changed((error) => {
			if (!error) {
				livereload.changed(file);
			}
		});
	}

	watch(serverFiles)
		.on('change', restart)
		.pipe(notify('Reload file: <%= file.relative %>'));
});


gulp.task('eslint', 'Code linting', () => {
	return gulp.src(eslintFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.on('error', notify.onError(error => {
			return error.message;
		}))
		.on('error', onError);
});

gulp.task('default', 'Start in dev mode', ['eslint', 'start', 'watch']);

gulp.task('pre-test', 'Pre-test', () => {
	return gulp.src(serverFiles)
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
});

gulp.task('test', 'Run tests', ['pre-test'], () => {

	require('./middlewares/logger').removeConsoleTransport(); // Hide logs for test

	return gulp.src(testFiles)
		.pipe(mocha())
		.once('error', notify.onError(error => {
			return error.message;
		}))
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({ thresholds: { global: 70 } })) // Coverage percentage
		.once('error', onError)
		.once('error', notify.onError(error => {
			return error.message;
		}))
		.once('end', () => {
			process.exit();
		});
});


gulp.task('clean', 'Borra el package', del.bind(null, 'target'));

gulp.task('package', 'Hace el package del proyecto en un tar.gz', ['clean'], () => {
	gulp.src(pack)
		.pipe(tar(`${packageJson.name}-${packageJson.version}.tar`))
		.pipe(gzip())
		.pipe(gulp.dest('target'));
});

